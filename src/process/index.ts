import { Stage } from "../stage";
import { find, propEq } from 'ramda';

export interface Process {
    name: string;
    stages: Stage[];
}

export const constructProcess = async (processName: string): Promise<Process> => {
    const allObserevedStagesNamesOfProcess: StageName[] = await getAllObserevedStagesNamesOfProcess(processName);
    const processStages: Stage[] = await getStages(processName, allObserevedStagesNamesOfProcess);
    const processInstances: ProcessInstance[] = await getProcessInstances(processName);

    // TODO: think about splits in the process
    const processNextStagesMap: Map<StageName, Set<StageName>> = generateNextStagesMap(processStages, processInstances);

    const processFlows: ProcessInstance[] = calculateProcessFlows(processNextStagesMap);
};

/**
 * The series of stages names in the process
 */
type ProcessInstance = StageName[];
type StageName = Stage["name"];

export function generateNextStagesMap(processStagesNames: StageName[], processInstances: ProcessInstance[]): Map<string, Set<string>> {
    const map = new Map<string, Set<StageName>>(
        processStagesNames.map(stageName => [stageName, new Set<StageName>()])
    );

    processInstances.forEach(processInstance =>
        processInstance.forEach((currStage, idx) => {
            if (idx < processInstance.length - 1) {
                map.get(currStage)?.add(processInstance[idx + 1]);
            }
        })
    );

    return map;
}
