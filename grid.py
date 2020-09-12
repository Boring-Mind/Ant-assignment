import time
from typing import Tuple

import cv2
import fill_grid
import numpy as np


class Field(object):
    @property
    def image(self):
        return self._image

    def __init__(self, n: int, m: int):
        self._image = __class__.create_blank(n, m)

    @classmethod
    def sum_digits_in_tuple(cls, numbers: tuple) -> int:
        return cls.sum_digits(''.join(map(str, numbers)))

    @classmethod
    def sum_digits(cls, n: str) -> int:
        return sum([int(num) for num in n])

    @classmethod
    def point_is_unreachable(cls, x: int, y: int):
        return cls.sum_digits_in_tuple((x, y)) > 25

    @classmethod
    def create_blank(cls, n: int, m: int):
        """Create new image(numpy array) filled with certain color in RGB."""
        image = np.zeros((n, m, 3), np.uint8)

        color = (255, 255, 255)
        # Since OpenCV uses BGR, convert the color first
        # color = tuple(reversed(color))
        # Fill image with color
        image[:] = color

        return image

    def map_obstacles(self):
        image = self.image
        rows = image.shape[0]
        cols = image.shape[1]
        obstacle_color = tuple(reversed((200, 0, 0)))

        for x in range(rows):
            for y in range(cols):
                if __class__.point_is_unreachable(x, y):
                    image[x, y] = obstacle_color
        self._image = image
        return image

    def fill_available_space(self, target: Tuple[int, int]):
        image = self.image
        
        width = image.shape[0]
        height = image.shape[1]

        mask = np.zeros((height + 2, width + 2), np.uint8)

        blocked_color = tuple(reversed((0, 0, 200)))

        cv2.floodFill(image, mask, target, blocked_color)


def main():
    field1 = Field(2000, 2000)
    cv2.imwrite("image.png", field1.image)
    field1.map_obstacles()
    cv2.imwrite("result.png", field1.image)
    field1.fill_available_space((1000, 1000))
    cv2.imwrite("result1.png", field1.image)


if __name__ == '__main__':
    main()
