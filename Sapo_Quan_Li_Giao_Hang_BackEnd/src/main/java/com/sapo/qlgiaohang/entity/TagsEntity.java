package com.sapo.qlgiaohang.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "tags")
@Getter
@Setter
public class TagsEntity extends BaseEntity{
    @Column(name = "value" , unique = true)
    private String value;

    @JsonIgnore
    @ManyToMany(mappedBy = "tagsEntities")
    private List<ProductEntity> productEntityList;
}
