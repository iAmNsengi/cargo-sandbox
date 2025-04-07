pub fn get_even_from_vector(vec: &mut Vec<i32>){
    vec.retain(|&item| item %2 == 0);
}