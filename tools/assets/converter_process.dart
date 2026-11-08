import 'dart:io';

import 'package:pixeldart/assets/importers/asset_import_diagnostic.dart';
import 'package:pixeldart/assets/importers/converter_command.dart';
import 'package:pixeldart/assets/importers/converter_invocation.dart';
import 'package:pixeldart/assets/importers/fbx_import_config.dart';

/// In-memory process evidence for one converter probe and invocation.
/// stdout/stderr are available to the caller for local troubleshooting but are
/// never included in [ConverterInvocationResult.toJson].
final class ConverterProcessReport {
  final ConverterInvocationResult evidence;
  final String stdout;
  final String stderr;

  const ConverterProcessReport({
    required this.evidence,
    this.stdout = '',
    this.stderr = '',
  });
}

Future<ConverterProcessReport> runConverterProcess({
  required ConverterCommandSpec spec,
  required FbxImportConfig config,
  required String sourcePath,
  required String outputPath,
  String blenderScript = 'tools/assets/fbx_blender_export.py',
}) async {
  try {
    final probe = await Process.run(spec.executable, spec.versionArguments);
    final probeOutput = '${probe.stdout}\n${probe.stderr}';
    final versionOk =
        probe.exitCode == 0 &&
        spec.versionMatches(config.converterVersion, probeOutput);
    if (!versionOk) {
      return ConverterProcessReport(
        evidence: ConverterInvocationResult(
          converterId: spec.converterId,
          requestedVersion: config.converterVersion,
          observedVersion: _firstLine(probeOutput),
          exitCode: 8,
          diagnostics: [
            AssetImportDiagnostic(
              code: probe.exitCode == 0
                  ? 'CONVERTER_VERSION_MISMATCH'
                  : 'CONVERTER_PROBE_FAILED',
              severity: DiagnosticSeverity.error,
              stage: 'converter',
              message: probe.exitCode == 0
                  ? 'converter version does not match configured version'
                  : 'converter version probe failed',
              remediation: 'install or select the pinned converter version',
            ),
          ],
        ),
        stdout: '${probe.stdout}',
        stderr: '${probe.stderr}',
      );
    }

    final arguments = spec.arguments(
      sourcePath: sourcePath,
      outputPath: outputPath,
      animationPolicy: config.animationPolicy,
    );
    final result = await Process.run(
      spec.executable,
      spec.converterId == 'blender-headless'
          ? _withBlenderScript(arguments, blenderScript)
          : arguments,
    );
    return ConverterProcessReport(
      evidence: ConverterInvocationResult(
        converterId: spec.converterId,
        requestedVersion: config.converterVersion,
        observedVersion: _firstLine(probeOutput),
        exitCode: result.exitCode,
        diagnostics: result.exitCode == 0
            ? const []
            : [
                const AssetImportDiagnostic(
                  code: 'CONVERTER_FAILED',
                  severity: DiagnosticSeverity.error,
                  stage: 'converter',
                  message: 'converter process failed',
                  remediation:
                      'inspect the local converter output and pinned tool version',
                ),
              ],
      ),
      stdout: '${result.stdout}',
      stderr: '${result.stderr}',
    );
  } on ProcessException catch (error) {
    return ConverterProcessReport(
      evidence: ConverterInvocationResult(
        converterId: spec.converterId,
        requestedVersion: config.converterVersion,
        exitCode: 8,
        diagnostics: [
          AssetImportDiagnostic(
            code: 'CONVERTER_UNAVAILABLE',
            severity: DiagnosticSeverity.error,
            stage: 'converter',
            message: 'converter executable is unavailable: ${error.message}',
            remediation: 'install the pinned converter and retry',
          ),
        ],
      ),
    );
  }
}

List<String> _withBlenderScript(List<String> arguments, String script) {
  final copy = List<String>.of(arguments);
  final index = copy.indexOf('--python');
  if (index >= 0 && index + 1 < copy.length) copy[index + 1] = script;
  return copy;
}

String? _firstLine(String output) {
  final trimmed = output.trim();
  return trimmed.isEmpty ? null : trimmed.split('\n').first;
}
