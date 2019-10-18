export const getAllProjects = async () => { 
    return await Promise.resolve(
    [
        {
            name: "Mocked project 1",
            tags: ["design", "development"],
            note: "Lorem ipsum crap"
        },
        {
            name: "Mocked project 2",
            note: "Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
        },
        {
            name: "Mocked project 3",
            tags: ["tag3", "tag4"]
        },
        {
            name: "Mocked project 4",
            tags: ["tag5", "tag6"]
        }
    ]);
}