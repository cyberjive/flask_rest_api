# TODO Fix Jscript, move 'db' and add data, more routes?
# Add logging
from flask import make_response, abort

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

# Create a handler for read (GET) movies
def read_all():
    """
    Responds to api/movies and return alls movies

    :return:        json string list of movies
    """
    # Create the list of movies from our data
    return {key: MOVIES[key] for key in sorted(MOVIES.keys())}


# Specific ID
def read_one(id: int):
    """
    Requests one movie by id

    :param id: ID of movie in database
    :type: int
    :return: movie matching ID
    :rtype: movie
    """
    # existence check
    if id in MOVIES.keys():
        movie = {id: MOVIES.get(id)}
    else:
        abort(404, f"Movie with ID of { id } not found.")

    return movie


def create(movie: dict):
    """
    Creates a new movie based on data provided

    :param movie:  movie to create in movie structure
    :return:        201 on success, 406 on movie exists
    """
    mname = movie.get("mname", None)
    mgenre = movie.get("mgenre", None)
    mdatereleased = movie.get("mdatereleased", None)
    mruntime = movie.get("mruntime", None)

    if (
        movie["mname"] not in [movie[1]["mname"] for movie in MOVIES.items()]
        and mname is not None
    ):
        # kludge and would need discrete GUIDs in PROD
        MOVIES[max(MOVIES.keys()) + 1] = {
            "mname": mname,
            "mgenre": mgenre,
            "mdatereleased": mdatereleased,
            "mruntime": mruntime,
        }
        return make_response(
            f"{ mname } with { max(MOVIES.keys()) } as ID succesfully created", 201
        )
    else:
        abort(406, f"{ movie } already exists.")


def update(id, movie):
    """
    Update a movie in the DB based on id

    :param id: id of movie to update
    :type: int
    :param movie: movie to update
    :type string
    :return: updated movie stucture
    """
    if id in MOVIES.keys():
        MOVIES[id]["mname"] = movie.get("mname")
        MOVIES[id]["mgenre"] = movie.get("mgenre")
        MOVIES[id]["mdatereleased"] = movie.get("mdatereleased")
        MOVIES[id]["mruntime"] = movie.get("mruntime")

        return {id: MOVIES[id]}

    else:
        abort(404, f"No movie with { id } found.")


def delete(id):
    """
    Deletes an entry form the database

    :param id: id of movie to delete
    :type: integer
    :return: 200 on successful delete, 404 if not found
    """
    if id in MOVIES.keys():
        del MOVIES[id]
        return make_response(f" { id } successfully deleted.")

    else:
        abort(404, f"Movie with { id } not found.")
