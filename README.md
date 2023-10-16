# Sting-Ray

![Sting Ray screen shot](https://github.com/matcodesalot/sting-ray/assets/20878859/6b8e4383-9775-4f27-829e-7eb539d099e2)

Sting Ray is an implementation of a raycaster written in JavaScript. [Raycasting](https://en.wikipedia.org/wiki/Ray_casting) is a technique used to simulate 3D graphics by projecting rays based on a 2D plane. This method was first popularized by [Wolfenstein 3D](https://en.wikipedia.org/wiki/Wolfenstein_3D) developed by [Id Software](https://www.idsoftware.com/) in 1992.

## How the Raycaster Works

The raycaster works by emitting rays from the players position towards walls in the scene. The [DDA algorithm](https://en.wikipedia.org/wiki/Digital_differential_analyzer_(graphics_algorithm)) is used to optimize the ray projection process by using trigonometric functions. This enhances the performance and accuracy of the engine.

## Getting Started

Please note since this project is importing/exporting multiple files, you will run into a CORS block if you try to run the `index.html` file locally. You will need to run this from a server to get everything running. If you are using [vscode](https://code.visualstudio.com/), a simple way to avoid this issue is to use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.

## Controls

- W or Arrow Up: move player forward
- S or Arrow Down: move player backward
- A or Arrow Left: rotate player left
- D or Arrow Right: rotate player right

- To run, hold down Left Shift while moving forward or backward

## Credits

- This project was programmed by [matcodesalot](https://github.com/matcodesalot).

## Acknowledgements

- [Lode's Raycasting Tutorial (written in C)](https://lodev.org/cgtutor/raycasting.html)
- [Super Fast Ray Casting in Tiled Worlds using DDA](https://youtu.be/NbSee-XM7WA) by [Javidx9](https://www.youtube.com/@javidx9)
- [Make Your Own Raycaster Part 1 (written in C)](https://youtu.be/gYRrGTC7GtA) by [3DSage](https://www.youtube.com/@3DSage)
- [Creating a DOOM (Wolfenstein) - style 3D Game in Python](https://youtu.be/ECqUrT7IdqQ) by [Coder Space](https://www.youtube.com/@CoderSpaceChannel)
