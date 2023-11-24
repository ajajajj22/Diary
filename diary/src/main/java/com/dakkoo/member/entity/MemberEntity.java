package com.dakkoo.member.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "member_table") // table 이름
public class MemberEntity {
    @Id // pk 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment 지정
    private Long id;

    @Column(unique = true) // unique 제약 조건 추가
    private String memberEmail;

    @Column(unique = true)
    private String memberPassowrd;

    @Column(unique = true)
    private String memberName;

}
