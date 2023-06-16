import { Stage } from "../stage";
import { find, propEq } from 'ramda';

export interface Process {
    name: string;
    stages: Stage[];
}

export const constructProcess = async (processName: string): Promise<Process> => {
    const allObserevedStagesNamesOfProcess: Stage["name"][] = await getAllObserevedStagesNamesOfProcess(processName);
    const processStages: Stage[] = await getStages(processName, allObserevedStagesNamesOfProcess);
    const processInstances: ProcessInstance[] = await getProcessInstances(processName);

    // TODO: think about splits in the process
    const processNextStages

};

/**
 * The series of stages names in the process
 */
type ProcessInstance = Stage["name"][];