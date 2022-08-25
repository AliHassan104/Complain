package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
//    @Query("select distinct u from User u left join fetch u.roles where u.name = ?1")
//    User findByName(String name);
}
