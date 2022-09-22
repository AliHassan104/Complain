package com.company.ComplainProject.repository.specification;

import com.company.ComplainProject.model.ComplainType;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import com.company.ComplainProject.dto.SearchCriteria;

public class ComplainTypeSpecification implements Specification<ComplainType> {

    private SearchCriteria searchCriteria;

    public ComplainTypeSpecification(SearchCriteria searchCriteria) {
        this.searchCriteria = searchCriteria;
    }

    @Override
    public Predicate toPredicate(Root<ComplainType> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (searchCriteria.getOperation().equalsIgnoreCase(":")) {
            return criteriaBuilder.equal(root.get(searchCriteria.getKey()), searchCriteria.getValue());
        } else if (searchCriteria.getOperation().equalsIgnoreCase(">")) {
            return criteriaBuilder.lessThanOrEqualTo(root.get(searchCriteria.getKey()), searchCriteria.getValue().toString());
        } else if (searchCriteria.getOperation().equalsIgnoreCase("<")) {
            return criteriaBuilder.greaterThanOrEqualTo(root.get(searchCriteria.getKey()), searchCriteria.getValue().toString());
        }
        return null;
    }
}
