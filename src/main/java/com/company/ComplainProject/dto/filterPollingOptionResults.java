package com.company.ComplainProject.dto;

import com.company.ComplainProject.model.PollingOption;

import java.util.Comparator;
import java.util.Map;
import java.util.Set;

public class filterPollingOptionResults implements Comparator<PollingQuestionResult> {

    @Override
    public int compare(PollingQuestionResult o1, PollingQuestionResult o2) {
        return o2.getGetPollingQuestionResult().get(String.join(", ", o2.getGetPollingQuestionResult().keySet())).compareTo(o1.getGetPollingQuestionResult().get(String.join(", ", o1.getGetPollingQuestionResult().keySet())));
    }
}

