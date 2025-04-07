pub fn get_even_from_vector(vec: Vec<i32>)-> Vec<i32>{
    let mut even_vectors = Vec::new();

    for item in vec{
        if item %2 == 0{
            even_vectors.push(item);
        }
    }
    even_vectors
}