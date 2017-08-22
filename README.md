# adapt-scoring 

##Installation

Adds a simple scoring function to Adapt questions - no question weighting, simply points assigned to a question. 

Waits for completion on question then scores depending on answers and attempts

First layer represents which answer you are referring to and second layer refers to the attempts

Add value at course level so is independent of 'assessment' and not based on scoring in comparison to other questions (aka Adapts in built scoring)

"_questionScore" : {
    "0" : {
        "1" : 0,
        "2" : 0
    },
    "1" : {
        "1" : 500,
        "2" : 250
    },
    "2" : {
        "1" : -250,
        "2" : -250
    }
},