use std::collections::HashMap;

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
}