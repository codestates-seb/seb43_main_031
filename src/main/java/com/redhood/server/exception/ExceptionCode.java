package com.redhood.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    EMAIL_EXISTS(409, "Email exists"),
    PASSWORD_NOT_MATCH(404, "Password does not match"),
    JWT_EXPIRATION(403, "JWT Expired"),
    AUTHOR_NOT_MATCH(409, "Author and requester do not match"),
    ALREADY_ACCEPT(409, "Already in accept"),
    ALREADY_REQUEST(409, "Already in request"),
    BOARD_NOT_FOUND(404, "Board not found"),
    APPLY_NOT_FOUND(404, "Apply not found"),
    COMMENT_NOT_FOUND(404,"Comment not found"),
    BOARD_EXISTS(409, "Board exists");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
