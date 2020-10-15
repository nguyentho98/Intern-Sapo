package com.sapo.qlgiaohang.repositoties;

import com.sapo.qlgiaohang.entity.TagsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TagRepository extends JpaRepository<TagsEntity, Long> {

    @Query("select t from TagsEntity t where t.value=:value")
    TagsEntity findTagByValue(@Param("value") String value);

    @Query(value = "select t.value from tags t where t.value like :tag limit 0,10",nativeQuery = true)
    String[] getTagsValue(@Param("tag")String tag);
}
