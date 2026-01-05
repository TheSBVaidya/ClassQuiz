package com.classquiz.student.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class Result {

    private String q;
    private String correct;
    private String studentAns;
    private List<String> options;
}
