import { IPipeline } from "./IPipeline";
import tl = require('azure-pipelines-task-lib/task');

export class Branch{

    private pipelines: IPipeline[]; 
    private name: string;

    constructor(name: string, pipelines: IPipeline[]){
        this.pipelines = pipelines;
        this.name = name;
    }

    public getPipelineFailStreak(): number{
        let count: number = 0;
        for (let numberPipeline = 0; numberPipeline < this.pipelines.length; numberPipeline++){
            if (this.pipelines[numberPipeline].isFailure()){
                count++;
            }
            else {
                break;
            }
        }
        tl.debug(`number pipelines failing on ${this.name} is ${count}`)
        return count;
    }

    public getMostRecentFailedPipeline(): IPipeline | null{
        for (let pipeline of this.pipelines){
            tl.debug(pipeline.getId() + " : " + String(pipeline.isFailure()));
           if (pipeline.isFailure()){
                return pipeline; 
            }
        }
        return null;
    }

    public tooManyPipelinesFailed(failureThreshold: number): boolean {
        return this.getPipelineFailStreak() >= failureThreshold;
    }

    public getName(): string{
        return this.name;
    }

}
