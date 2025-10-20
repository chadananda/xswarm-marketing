/**
 * Machine Mode - JSONL Protocol
 *
 * Structured input/output for external orchestration.
 * Use `xswarm-marketing --json` to enable.
 *
 * Message Types:
 * - command: Execute an action
 * - approval: Request user approval
 * - status: Progress update
 * - progress: Detailed progress info
 * - result: Action result
 * - log: Informational logging
 * - error: Error information
 * - control: Control flow (pause, resume, cancel)
 */

import readline from 'readline';

// JSONL output helper
function emit(type, data) {
  const message = { type, timestamp: new Date().toISOString(), ...data };
  console.log(JSON.stringify(message));
}

export async function runMachineMode() {
  emit('status', { message: 'xswarm-marketing machine mode initialized' });
  emit('log', { level: 'info', message: 'JSONL protocol active' });
  emit('status', { message: 'Planning phase - full implementation coming soon' });

  // Set up readline for JSONL input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  emit('status', { message: 'Ready for commands' });
  emit('log', { level: 'info', message: 'Send JSONL commands via stdin' });

  rl.on('line', (line) => {
    try {
      const command = JSON.parse(line);

      if (command.type === 'command') {
        handleCommand(command);
      } else if (command.type === 'control') {
        handleControl(command);
      } else {
        emit('error', {
          code: 'UNKNOWN_MESSAGE_TYPE',
          message: `Unknown message type: ${command.type}`,
        });
      }
    } catch (error) {
      emit('error', {
        code: 'INVALID_JSON',
        message: 'Failed to parse JSON input',
        details: error.message,
      });
    }
  });

  rl.on('close', () => {
    emit('status', { message: 'Machine mode terminated' });
    process.exit(0);
  });
}

function handleCommand(command) {
  const { action, params } = command;

  emit('status', { message: `Received command: ${action}` });

  switch (action) {
    case 'daily_briefing':
      emit('status', { message: 'Generating daily briefing...' });
      emit('result', {
        action: 'daily_briefing',
        data: {
          message: 'Planning phase - briefing not yet implemented',
        },
      });
      break;

    case 'generate_outreach':
      emit('status', { message: 'Generating outreach messages...' });
      emit('result', {
        action: 'generate_outreach',
        data: {
          message: 'Planning phase - message generation not yet implemented',
        },
      });
      break;

    case 'ping':
      emit('result', { action: 'ping', data: { pong: true } });
      break;

    default:
      emit('error', {
        code: 'UNKNOWN_ACTION',
        message: `Unknown action: ${action}`,
      });
  }
}

function handleControl(command) {
  const { action } = command;

  switch (action) {
    case 'shutdown':
      emit('status', { message: 'Shutting down gracefully' });
      process.exit(0);
      break;

    default:
      emit('error', {
        code: 'UNKNOWN_CONTROL',
        message: `Unknown control action: ${action}`,
      });
  }
}
