package com.website.demo;

// import java.util.List;
// import java.util.stream.Collectors;
// import java.util.Arrays;

import jakarta.persistence.*;

@Entity 
@Table(name = "avail_slot") // for slot 
public class slot {
    @Id
    private int id;

    private int day1;
    private int day2;
    private int day3;
    private int day4;
    private int day5;
    private int day6;
    private int day7;
    private int day8;
    private int day9;
    private int day10;

    public slot() {}

    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}

    public int getDay1() {return day1;}
    public void setDay1(int day1) {this.day1 = day1;}

    public int getDay2() {return day2;}
    public void setDay2(int day2) {this.day2 = day2;}

    public int getDay3() { return day3;}
    public void setDay3(int day3) {this.day3 = day3;}

    public int getDay4() {return day4;}
    public void setDay4(int day4) {this.day4 = day4;}

    public int getDay5() {return day5;}
    public void setDay5(int day5) {this.day5 = day5;}

    public int getDay6() {return day6;}
    public void setDay6(int day6) {this.day6 = day6;}

    public int getDay7() {return day7;}
    public void setDay7(int day7) {this.day7 = day7;}

    public int getDay8() {return day8;}
    public void setDay8(int day8) {this.day8 = day8;}

    public int getDay9() {return day9;}
    public void setDay9(int day9) {this.day9 = day9;}

    public int getDay10() {return day10;}
    public void setDay10(int day10) {this.day10 = day10;}
}
