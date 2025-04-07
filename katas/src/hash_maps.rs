use std::{collections::HashMap, iter::Sum, };

pub fn render_hash_map(){
    let mut users= HashMap::new();
    users.insert(String::from("username"), "nsengi");

    let first_user_age =  users.get("username");
    match first_user_age {
        Some(name) => println!("{}", name),
        None => println!("User not found")
    }
} 

pub fn group_values_by_key(pairs: Vec<(String, String)>) -> HashMap<String, String>{
    let mut map: HashMap<String, String> = HashMap::new();
    for (key, value) in pairs{
        if !map.contains_key(&key){
            map.insert(key, value);
        }
    }
    map
}

pub fn iterate_on_array (){
    let mut v1 = vec![1,2,3,4,5];
    while let Some(i) = v1.iter_mut().next(){
        println!("{i}")
    }


    let v2 = vec![1,2,3];
    for item in &v2{
        println!("{}",item)
    }

    let sum : i32= v2.iter().sum();
    println!("{sum}");
}


pub fn filter_odd_double(){
    let vec = vec![1,2,3,4,5,6,7,8,9,10];
    let new_vec : Vec<i32>= vec.iter().filter(|item| *item %2 !=0).map(|item| *item *2).collect();
    println!("{:?}", new_vec)
}
