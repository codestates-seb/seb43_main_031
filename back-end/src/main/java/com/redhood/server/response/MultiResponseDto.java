package com.redhood.server.response;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;


@Getter
public class MultiResponseDto<T> {

    public List<T> data;
    public PageInfo pageInfo;

    public MultiResponseDto(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalPages());
    }
    public MultiResponseDto(List<T> data) {
        this.data = data;
    }
}
