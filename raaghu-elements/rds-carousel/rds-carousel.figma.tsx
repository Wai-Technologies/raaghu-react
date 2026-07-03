import React from "react"
import RdsCarousel from "./rds-carousel"
import figma from "@figma/code-connect"
import { CarouselFigmaSampleSlide } from "./rds-carousel-figma-slide";

figma.connect(
  RdsCarousel,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=1539-9671",
  {
    props: {
      style: figma.enum("✨ Style", {
        "Default": "default",
        "With Title": "with title",
        "Full Width Image": "full width image",
      }),
      state: figma.enum("💡 State", {
        "1": "1",
        "2": "2", 
        "3": "3",
        "4": "4"
      }),
    },
    example: (props) => (
      <RdsCarousel
        {...props}
        type="circle"
        showDots
        showArrows
        autoPlay={false}
      >
        <CarouselFigmaSampleSlide
          image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          text="Slide 1"
        />
        <CarouselFigmaSampleSlide
          image="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
          text="Slide 2"
        />
        <CarouselFigmaSampleSlide
          image="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
          text="Slide 3"
        />
        <CarouselFigmaSampleSlide
          image="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80"
          text="Slide 4"
        />
      </RdsCarousel>
    ),
  },
)
