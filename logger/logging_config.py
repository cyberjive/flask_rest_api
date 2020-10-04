import logging

# basic configuration
logging.basicConfig(
    filename="ReST_API.log",
    filemode="a",
    level=logging.DEBUG,
)

logger = logging.getLogger("ReST_API")

# TODO Formatting