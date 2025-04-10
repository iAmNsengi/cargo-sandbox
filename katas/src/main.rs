use chrono::{Date, Local, Utc};
use std::fs;

mod fibonacci;
mod is_even;
mod string_length;
mod even_vector;
mod hash_maps;

pub struct User {
    username: String,
    password: String,
    email: String,
    sign_in_count: i32,
}

struct Rect {
    width: i32,
    height: i32,
}

impl Rect {
    fn area(&self) -> i32 {
        self.width * self.height
    }
}

enum Shape {
    Rectangle(f64, f64),
    Circle(f64),
}

fn main() {
    hash_maps::filter_odd_double();
    hash_maps::render_hash_map();
    let mut vec = Vec::from([1,2,4,5,6]);
    even_vector::get_even_from_vector(&mut vec);
    println!("{:?}",vec);

    let num = 11;
    if is_even::is_even(num) {
        println!("Number {num} is even ");
    } else {
        println!("Number {num} is not even ");
    }

    println!(
        "Fibonacci of numbers to {num} is {:?} ",
        fibonacci::fibonacci(num)
    );

    println!(
        "Get length of a string: {}",
        string_length::get_string_length("iAmNsengi")
    );

    let user: User = User {
        username: String::from("nsengi"),
        password: String::from("nsengi"),
        email: String::from("nsengi"),
        sign_in_count: 1,
    };

    println!("User info {:?}", user.username);
    println!("User password {:?}", user.password);
    println!("User email {:?}", user.email);
    println!("User sign in count {:?}", user.sign_in_count);

    let rect1 = Rect {
        width: 12,
        height: 32,
    };
    println!(
        "The area of the rectangle is with width {} and height {} is {}",
        rect1.width,
        rect1.height,
        rect1.area()
    );

    let cirle = Shape::Circle(4.5);
    println!("Area of the circle is :{:?}", calculate_area(cirle));

    let index = find_index(String::from("iamnsengi"), 'n');
    match index {
        Some(value) => println!("Index found at {value}"),
        None => println!("Index not found"),
    }

    let file = fs::read_to_string("src/is_even.rs");
    match file {
        Ok(content) => println!("File conent: {}", content),
        Err(err) => println!("An error occuredd: {}", err),
    }
    println!("The time now is {}", Local::now())
}

fn calculate_area(shape: Shape) -> f64 {
    match shape {
        Shape::Circle(r) => r * r * 3.14,
        Shape::Rectangle(a, b) => a * b,
    }
}

fn find_index(str: String, character: char) -> Option<i32> {
    for (index, char) in str.chars().enumerate() {
        if char == character {
            return Some(index as i32);
        }
    }
    return None;
}
