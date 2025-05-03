package com.website.demo;

// import java.util.List;
// import java.util.stream.Collectors;
// import java.util.Arrays;

import jakarta.persistence.*;

@Entity 
@Table(name = "avail_slot") // for slot 
public class slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "day1")
    private Integer day1;

    @Column(name = "day2")
    private Integer day2;

    @Column(name = "day3")
    private Integer day3;

    @Column(name = "day4")
    private Integer day4;

    @Column(name = "day5")
    private Integer day5;

    @Column(name = "day6")
    private Integer day6;

    @Column(name = "day7")
    private Integer day7;

    @Column(name = "day8")
    private Integer day8;

    @Column(name = "day9")
    private Integer day9;

    @Column(name = "day10")
    private Integer day10;

    public slot() {}

    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}

    public Integer getDay1() {return day1;}
    public void setDay1(Integer day1) {this.day1 = day1;}

    public Integer getDay2() {return day2;}
    public void setDay2(Integer day2) {this.day2 = day2;}

    public Integer getDay3() { return day3;}
    public void setDay3(Integer day3) {this.day3 = day3;}

    public Integer getDay4() {return day4;}
    public void setDay4(Integer day4) {this.day4 = day4;}

    public Integer getDay5() {return day5;}
    public void setDay5(Integer day5) {this.day5 = day5;}

    public Integer getDay6() {return day6;}
    public void setDay6(Integer day6) {this.day6 = day6;}

    public Integer getDay7() {return day7;}
    public void setDay7(Integer day7) {this.day7 = day7;}

    public Integer getDay8() {return day8;}
    public void setDay8(Integer day8) {this.day8 = day8;}

    public Integer getDay9() {return day9;}
    public void setDay9(Integer day9) {this.day9 = day9;}

    public Integer getDay10() {return day10;}
    public void setDay10(Integer day10) {this.day10 = day10;}
}
