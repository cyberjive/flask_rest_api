from datetime import datetime

from flask import make_response, abort

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

# Temp Data to serve
MOVIES = {
    1: {
        "mname": "Looper",
        "mgenre": "Scifi",
        "mdatereleased": "09-28-2012",
        "mruntime": 118,
    },
    2: {
        "mname": "Children of Men",
        "mgenre": "Scifi",
        "mdatereleased": "09-03-2006",
        "mruntime": 109,
    },
    3: {
        "mname": "Pulp Fiction",
        "mgenre": "Pulp?",
        "mdatereleased": "05-21-1994",
        "mruntime": 154,
    },
    4: {
        "mname": "Reservoir Dogs",
        "mgenre": "Crime",
        "mdatereleased": "10-09-1992",
        "mruntime": 99,
    },
}

# Create a handler for our read (GET) movies
def read_all():
    """
    This function responds to a request for /api/movies
    with the complete lists of movies

    :return:        sorted list of movies
    """
    # Create the list of movies from our data
    return [MOVIES[key] for key in sorted(MOVIES.keys())]

def read_one(id):
    """
    This function responds to a request for api/peole/{id}
    with one matching movie from movies

    :param id: ID of movie in database
    :type: int
    :return: movie matching ID
    :rtype: movie
    """
    # existence check
    if id in MOVIES.keys():
        movie = MOVIES.get(ID)
    else:
        abort(
            404, f'Movie with ID of { id } not found.'
        )
    return movie

def create(movie):
    """
    This function creates a new movie in the movie DB
    based on the passed in movie data

    :param movie:  movie to create in movie structure
    :return:        201 on success, 406 on movie exists
    """ 
    mname = movie.get("mname", None)

    if movie not in MOVIES and mname is not None:
        MOVIES.update(movie)
        return MOVIES[movie.key], 201
    else:
        abort(
            406,
            f'{ movie } already exists.'
        )