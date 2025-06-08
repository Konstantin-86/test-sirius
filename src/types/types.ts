export interface Survey {
    q1_1: string;
    q1_2: string;
    q1_3: string;
    q1_4: string;
    q1_5: string;
    q1_6: string;
    q1_7: string;
    q1_8: string;
    q1_9: string;
    q1_10: string;

    q2_1: string;
    q2_2: string;
    q2_3: string;
    q2_4: string;
    q2_5: string;
    q2_6: string;
    q2_7: string;
    q2_8: string;
    q2_9: string;
    q2_10: string;

    q3_1: string;
    q3_2: string;
    q3_3: string;
    q3_4: string;
    q3_5: string;
    q3_6: string;
    q3_7: string;
    q3_8: string;
    q3_9: string;
    q3_10: string;

    q4_1: string;
    q4_2: string;
    q4_3: string;
    q4_4: string;
    q4_5: string;
    q4_6: string;
    q4_7: string;
    q4_8: string;
    q4_9: string;
    q4_10: string;
}

export interface FileMetadata {
    id: string;
    name: string;
    size: number;
    type: string;
    lastModified: number;
    preview: string;
}
