package com.company.ComplainProject.dto;

import java.util.Comparator;
import java.util.Map;
import java.util.Set;

public class filterPollingOptionResults implements Comparator<Map<String,Long>> {

    /**
     * Sort the Hash Map of Polling Options ( answered  by user)
     * @param o1
     * @param o2
     * @return
     */

    @Override
    public int compare(Map<String, Long> o1, Map<String, Long> o2) {
        return o2.get(String.join(", ", o2.keySet())).compareTo(o1.get(String.join(", ", o1.keySet())));
    }
}

