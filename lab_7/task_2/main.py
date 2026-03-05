from models import Bicycle, Car, Vehicle


def main() -> None:
    vehicles: list[Vehicle] = [
        Vehicle("Generic", "Transporter", 2020),
        Car("Tesla", "Model 3", 2024, doors=4, electric=True),
        Bicycle("Trek", "FX 2", 2023, gear_count=18, has_bell=True),
    ]

    print("vehicle objects:")
    for vehicle in vehicles:
        print(vehicle)

    print("\nshared behavior:")
    for vehicle in vehicles:
        print(vehicle.start())

    print("\npolymorphism (drive method):")
    for vehicle in vehicles:
        print(vehicle.drive())

    print("\nchild-specific behavior:")
    for vehicle in vehicles:
        if isinstance(vehicle, Car):
            print(vehicle.honk())
        if isinstance(vehicle, Bicycle):
            print(vehicle.ring_bell())


if __name__ == "__main__":
    main()
