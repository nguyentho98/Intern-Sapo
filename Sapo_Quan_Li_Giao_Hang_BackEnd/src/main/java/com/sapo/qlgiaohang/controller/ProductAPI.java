package com.sapo.qlgiaohang.controller;

import com.sapo.qlgiaohang.dto.product.*;
import com.sapo.qlgiaohang.entity.ProductEntity;
import com.sapo.qlgiaohang.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class ProductAPI {

    private ProductService productService;

    @Autowired
    public ProductAPI(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/products/filter")
    public ProductResponse getAll(@RequestParam int page, @RequestParam int limit, @RequestBody FilterRequest filterRequest) {

        return productService.findAll(page, limit, filterRequest);
    }

    @GetMapping("/products/{id}")
    public ProductEntity getOne(@PathVariable Long id) {
        return productService.findOne(id);
    }

    @PostMapping("/products")
    public Long save(@Valid @RequestBody ProductDTO productDTO) {
        return productService.save(productDTO);
    }

    @PutMapping("/products/{id}")
    public Long update(@RequestBody ProductDTO productDTO, @PathVariable Long id) {
        return productService.update(productDTO, id);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id) {
        productService.delete(id);
        return new ResponseEntity<>(1L, HttpStatus.OK);
    }

    @GetMapping("/brand")
    public ProductBrandResponse getBrand(@RequestParam String brand, @RequestParam long page) {
        return productService.getBrand(brand, page);
    }

    @GetMapping("/cate")
    public ProductCategoryResponse getCate(@RequestParam String cate, @RequestParam long page) {
        return productService.getCategory(cate, page);
    }

    @GetMapping("/tags")
    public String[] getTags(@RequestParam String tag) {
        return productService.getTags(tag);
    }


}
