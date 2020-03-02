//import { ICellRendererParams } from 'ag-grid-community';
import { AgCellRendererBase } from './ag-cell-renderer-base';
import { ICellRendererParams } from 'ag-grid-community';

export interface AgCellRendererEvent {
    type: string;
    params: ICellRendererParams;
}

export namespace AgCellRendererEvent {
    // Generik events
    export const LINK_EVENT = 'LINK_EVENT';
    export const VIEW_EVENT = 'VIEW_EVENT';
    export const EDIT_EVENT = 'EDIT_EVENT';
    export const EDIT_VALUE = 'EDIT_VALUE';
    export const DELETE_EVENT = 'DELETE_EVENT';
    export const CREATE_EVENT = 'CREATE_EVENT';
    export const SHARE_EVENT = 'SHARE_EVENT';
    export const ACTIVE_EVENT='ACTIVE_EVENT';
    export const EDIT = 'EDIT';
    export const VIEW = 'VIEW';
    export const DELETE = 'DELETE';
    export const CREATE = 'CREATE';
    export const CLONE = 'CLONE';
    export const SHARE = 'SHARE';
    export const EXECUTE = 'EXECUTE';
    export const SCHEDULE = 'SCHEDULE';
    export const LINK = 'LINK';
    export const VIEW_JSON = 'VIEW_JSON';
    export const EDIT_JSON = 'EDIT_JSON';
    export const EXPORT_JSON = 'EXPORT_JSON';
    export const LOCK = 'LOCK';
    export const UNLOCK = 'UNLOCK';
    export const BUTTON = 'BUTTON';
    export const ACTIVE ='ACTIVE';

    // Workflo Executions list page specific
    export const WFE_VIEW_RESULT = 'WFE_VIEW_RESULT';
    export const WFE_VIEW_FULL_RESULT = 'WFE_VIEW_FULL_RESULT';
    export const WFE_VIEW_LOGS = 'WFE_VIEW_LOGS';
    export const WFE_VIEW_JOB_DETAILS = 'WFE_VIEW_JOB_DETAILS';
    export const WFE_ACTION_STOP = 'WFE_ACTION_STOP';
    export const WFE_ACTION_KILL = 'WFE_ACTION_KILL';

    // Workflo category page specific
    export const WF_VIEW_EXECUTION = 'WF_VIEW_EXECUTION';
    
    // dataset page specific
    export const DATASET_DATA_ANALITICS = 'DATASET_DATA_ANALITICS';
}

export interface AgCellRendererEventHandler {
    context: {componentParent: AgCellRendererEventHandler};
    
    frameworkComponents: {[key: string]: AgCellRendererBase};
    handleAgRendererEvent(event: AgCellRendererEvent): void;
}
