import { Stage } from "../stage";
import { find, propEq } from 'ramda';


export interface Process {
    name: string;
    stages: Stage[];
    transitions: Transition[];
}

export const constructProcess = async (processName: string): Promise<Process> => {
    const allObserevedStagesNamesOfProcess: StageName[] = await getAllObserevedStagesNamesOfProcess(processName);
    const processStages: Stage[] = await getStages(processName, allObserevedStagesNamesOfProcess);
    const processInstances: ProcessInstance[] = await getProcessInstances(processName);

    const processStagesNames = processStages.map(stage => stage.name);
    return constructProcessFrom(processStagesNames, processInstances, processName, processStages);
};

/**
 * The series of stages names in the process
 */
type ProcessInstance = StageName[];
type StageName = Stage["name"];
type Transition = [StageName, StageName];


export const generateNextStagesMap = (processStagesNames: StageName[], processInstances: ProcessInstance[]): Map<string, Set<string>> => {
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
};

export const generateTransitions = (processNextStagesMap: Map<string, Set<string>>): Transition[] =>
    Array.from(processNextStagesMap).flatMap(([stageName, nextStagesNames]) =>
        Array.from(nextStagesNames).map((nextStageName): Transition =>
            [stageName, nextStageName]
        )
    );
const constructProcessFrom = (processStagesNames: string[], processInstances: ProcessInstance[], processName: string, processStages: Stage[]) => {
    const processNextStagesMap: Map<StageName, Set<StageName>> = generateNextStagesMap(processStagesNames, processInstances);

    const transitions: Transition[] = generateTransitions(processNextStagesMap);

    return {
        name: processName,
        stages: processStages,
        transitions
    };
}

