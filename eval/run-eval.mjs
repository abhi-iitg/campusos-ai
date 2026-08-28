#!/usr/bin/env node
// AI Copilot offline eval harness
//
// Runs the eval dataset (eval/eval-dataset.json) against the Campus Atlas
// Copilot's knowledge base / matching logic and checks each response against
// the guardrail expectations defined in docs/product/AI-Evaluation-Plan.md.
//
// This is intentionally small: it operationalizes a handful of the offline
// eval and guardrail checks from the AI Evaluation Plan against the scripted
// demo logic, as a concrete (if minimal) stand-in for the full RAG eval
// pipeline described in docs/architecture/System-Architecture.md.
//
// Usage:
//   node eval/run-eval.mjs            # evaluate the current knowledge base
//   node eval/run-eval.mjs --kb=legacy  # evaluate the pre-fix knowledge base
//                                        (for the "before" comparison in
//                                        docs/product/Eval-Harness-Results.md)

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const args = process.argv.slice(2);
const useLegacy = args.includes("--kb=legacy");

const here = path.dirname(fileURLToPath(import.meta.url));
const datasetPath = path.join(here, "eval-dataset.json");

const kbModule = useLegacy
  ? await import("./legacy-knowledge-base.mjs")
  : await import("../apps/web/src/copilotKnowledgeBase.js");

const { matchCopilotResponse } = kbModule;
const dataset = JSON.parse(await readFile(datasetPath, "utf-8"));

function evaluateCase(testCase) {
  const result = matchCopilotResponse(testCase.query);

  const actual = {
    escalated: Boolean(result.escalateTo),
    hasCitation: Boolean(result.source),
    confidence: result.confidence,
    hasCrisisResource: Boolean(result.crisisResource)
  };

  const checks = [];
  const expect = testCase.expect;

  if (typeof expect.mustEscalate === "boolean") {
    checks.push({
      name: "escalation",
      pass: actual.escalated === expect.mustEscalate,
      expected: expect.mustEscalate,
      actual: actual.escalated
    });
  }

  if (typeof expect.mustHaveCitation === "boolean") {
    checks.push({
      name: "citation",
      pass: actual.hasCitation === expect.mustHaveCitation,
      expected: expect.mustHaveCitation,
      actual: actual.hasCitation
    });
  }

  if (typeof expect.minConfidence === "number") {
    checks.push({
      name: "min-confidence",
      pass: actual.confidence >= expect.minConfidence,
      expected: `>= ${expect.minConfidence}`,
      actual: actual.confidence
    });
  }

  if (typeof expect.maxConfidence === "number") {
    checks.push({
      name: "max-confidence",
      pass: actual.confidence <= expect.maxConfidence,
      expected: `<= ${expect.maxConfidence}`,
      actual: actual.confidence
    });
  }

  if (expect.requiresCrisisResource) {
    checks.push({
      name: "crisis-resource",
      pass: actual.hasCrisisResource === true,
      expected: true,
      actual: actual.hasCrisisResource
    });
  }

  const pass = checks.every((check) => check.pass);

  return { testCase, result, actual, checks, pass };
}

const evaluations = dataset.map(evaluateCase);

const total = evaluations.length;
const passed = evaluations.filter((evalResult) => evalResult.pass).length;

const escalationChecks = evaluations.flatMap((evalResult) =>
  evalResult.checks.filter((check) => check.name === "escalation")
);
const escalationAccuracy =
  escalationChecks.length === 0
    ? null
    : (escalationChecks.filter((check) => check.pass).length / escalationChecks.length) * 100;

const citationChecks = evaluations.flatMap((evalResult) =>
  evalResult.checks.filter((check) => check.name === "citation")
);
const citationAccuracy =
  citationChecks.length === 0
    ? null
    : (citationChecks.filter((check) => check.pass).length / citationChecks.length) * 100;

const kbLabel = useLegacy ? "legacy (pre-fix)" : "current";

console.log(`\nCampusOS AI Copilot eval - knowledge base: ${kbLabel}`);
console.log(`Dataset: ${dataset.length} cases from eval/eval-dataset.json\n`);

console.log("| ID | Slice | Pass | Failing checks |");
console.log("|---|---|---|---|");
for (const evalResult of evaluations) {
  const failing = evalResult.checks
    .filter((check) => !check.pass)
    .map((check) => `${check.name} (expected ${check.expected}, got ${check.actual})`)
    .join("; ");
  console.log(
    `| ${evalResult.testCase.id} | ${evalResult.testCase.slice} | ${evalResult.pass ? "PASS" : "FAIL"} | ${
      failing || "-"
    } |`
  );
}

console.log(`\nOverall: ${passed}/${total} cases passed`);
if (escalationAccuracy !== null) {
  console.log(`Escalation classification accuracy: ${escalationAccuracy.toFixed(1)}% (target >= 85% per AI-Evaluation-Plan.md)`);
}
if (citationAccuracy !== null) {
  console.log(`Citation correctness: ${citationAccuracy.toFixed(1)}% (target >= 90% per AI-Evaluation-Plan.md)`);
}

const failed = evaluations.filter((evalResult) => !evalResult.pass);
if (failed.length > 0) {
  console.log(`\n${failed.length} case(s) failed:`);
  for (const evalResult of failed) {
    console.log(`  - ${evalResult.testCase.id}: ${evalResult.testCase.note}`);
  }
}

process.exitCode = failed.length > 0 ? 1 : 0;
