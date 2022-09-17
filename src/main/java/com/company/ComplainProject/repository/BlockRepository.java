package com.company.ComplainProject.repository;

import com.company.ComplainProject.model.Area;
import com.company.ComplainProject.model.Block;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface BlockRepository extends JpaRepository<Block,Long> {

    @Query("SELECT NEW com.company.ComplainProject.model.Block(b.id,b.block_name) FROM Block b WHERE b.area = :id ")
    List<Block>  getAllBlockByArea(@Param("id") Area areaId);

}
