package com.redhood.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    EMAIL_EXISTS(409, "Email exists"),
    PASSWORD_NOT_MATCH(404, "Password does not match"),
    NICKNAME_EXISTS(409, "Nickname exists"),
    BOARD_NOT_FOUND(404, "Board not found"),
    APPLY_NOT_FOUND(404, "Apply not found"),
    COMMENT_NOT_FOUND(404,"Comment not found"),
    ANSWER_AUTHOR_NOT_MATCH(404,"The author of the answer does not match");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
