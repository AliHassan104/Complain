package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.specification.UserSpecification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public interface UserRepository extends JpaRepository<User,Long> ,JpaSpecificationExecutor<User> {

//    @Query("select distinct u from User u left join fetch u.roles where u.name = ?1")
//    User findByName(String name);

}
