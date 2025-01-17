import {inject, Provider} from '@loopback/context';
import {IWorkflowServiceConfig, WorkerImplementationFn} from '../types';
import {Client, logger} from 'camunda-external-task-client-js';
import {WorkflowServiceBindings} from '../keys';
import {AnyObject} from '@loopback/repository';
import {ILogger, LOGGER} from '@sourceloop/core';

export class WorkerImplementationProvider
  implements Provider<WorkerImplementationFn> {
  client: Client;
  constructor(
    @inject(WorkflowServiceBindings.Config)
    config: IWorkflowServiceConfig,
    @inject(LOGGER.LOGGER_INJECT)
    private readonly ilogger: ILogger,
  ) {
    if (config.workflowEngineBaseUrl) {
      this.client = new Client({
        baseUrl: config.workflowEngineBaseUrl,
        use: logger,
      });
    } else {
      throw new Error('Invalid workflowEngine Config');
    }
  }
  value(): WorkerImplementationFn {
    return async (topic, cmd) => {
      if (this.client) {
        this.client.subscribe(topic, ({task, taskService}) => {
          cmd.operation({task, taskService}, (result: AnyObject) => {
            if (result) {
              this.ilogger.info(`Worker task completed - ${topic}`);
            }
          });
        });
      } else {
        throw new Error('Workflow client not connected');
      }
    };
  }
}
