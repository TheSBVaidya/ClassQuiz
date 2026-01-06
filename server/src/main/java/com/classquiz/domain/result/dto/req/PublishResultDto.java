package com.classquiz.domain.result.dto.req;

import lombok.Data;

import java.util.List;

@Data
public class PublishResultDto {

    private List<Long> ids;
    private String examTitle;
}
