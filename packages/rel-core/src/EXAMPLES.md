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
      followers: rel("FOLLOWING").from("User").to("User")
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