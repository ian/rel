// fields

{
Book: {
fields: {
name: string()
}
}
}

// relations

{
Book: {
relations: {
followers: relation("FOLLOWING").from("User").to("User")
}
}
}

// accessors

{
Book: {
accessors: {
find: true,
list: true
}
}
}

// mutators

{
Book: {
mutators: {
create: true
}
}
}
