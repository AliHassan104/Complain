package com.company.ComplainProject.dto;

import java.util.Comparator;
import java.util.Map;
import java.util.Set;

public class filterPollingOptionResults implements Comparator<Map<String,Long>> {

//    @Override
//    public int compare(PollingQuestionResult o1, PollingQuestionResult o2) {
//        return o2.getGetPollingQuestionResult().get(String.join(", ", o2.getGetPollingQuestionResult().keySet())).compareTo(o1.getGetPollingQuestionResult().get(String.join(", ", o1.getGetPollingQuestionResult().keySet())));
//    }

    @Override
    public int compare(Map<String, Long> o1, Map<String, Long> o2) {
        return o2.get(String.join(", ", o2.keySet())).compareTo(o1.get(String.join(", ", o1.keySet())));
    }
}

