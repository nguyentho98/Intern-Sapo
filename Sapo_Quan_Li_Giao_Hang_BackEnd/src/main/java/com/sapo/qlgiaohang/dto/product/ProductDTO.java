package com.sapo.qlgiaohang.dto.product;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

@Getter
@Setter
public class ProductDTO {

    @Length(max = 100,message = "Code Không quá 100 kí tự")
    private String code;

    @NotBlank(message = "Tên Sản Phẩm không được bỏ trống!!!")
    private String name;

    private String picturePath;

    private BigDecimal productPrice;

    private String description;

    private String category;

    private String brand;

    private String mass;

    private String[] tags;

    private String[] images;
}
