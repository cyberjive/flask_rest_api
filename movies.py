from datetime import datetime

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

# Temp Data to serve
MOVIES = {
    "1": {
        "mname": "Looper",
        "mgenre": "Scifi",
        "mdatereleased": "09-28-2012",
        "mruntime": 118,
    },
    "2": {
        "mname": "Children of Men",
        "mgenre": "Scifi",
        "mdatereleased": "09-03-2006",
        "mruntime": 109,
    },
    "3": {
        "mname": "Pulp Fiction",
        "mgenre": "Pulp?",
        "mdatereleased": "05-21-1994",
        "mruntime": 154,
    },
    "4": {
        "mname": "Reservoir Dogs",
        "mgenre": "Crime",
        "mdatereleased": "10-09-1992",
        "mruntime": 99,
    },
}

# Create a handler for our read (GET) movies
def read():
    """
    This function responds to a request for /api/movies
    with the complete lists of movies

    :return:        sorted list of movies
    """
    # Create the list of movies from our data
    return [MOVIES[key] for key in sorted(MOVIES.keys())]