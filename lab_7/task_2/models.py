class Vehicle:
    def __init__(self, brand: str, model: str, year: int) -> None:
        self.brand = brand
        self.model = model
        self.year = year

    def start(self) -> str:
        return f"{self.brand} {self.model} starts moving."

    def drive(self) -> str:
        return f"{self.brand} {self.model} is driving on the road."

    def __str__(self) -> str:
        return f"{self.year} {self.brand} {self.model}"


class Car(Vehicle):
    def __init__(self, brand: str, model: str, year: int, doors: int, electric: bool) -> None:
        super().__init__(brand, model, year)
        self.doors = doors
        self.electric = electric

    def drive(self) -> str:
        power_type = "electric" if self.electric else "gas-powered"
        return f"Car {self} ({power_type}) cruises smoothly with {self.doors} doors."

    def honk(self) -> str:
        return f"{self.brand} {self.model}: Beep beep!"


class Bicycle(Vehicle):
    def __init__(self, brand: str, model: str, year: int, gear_count: int, has_bell: bool) -> None:
        super().__init__(brand, model, year)
        self.gear_count = gear_count
        self.has_bell = has_bell

    def drive(self) -> str:
        bell_text = "with a bell" if self.has_bell else "without a bell"
        return f"Bicycle {self} is pedaled through the park ({self.gear_count} gears, {bell_text})."

    def ring_bell(self) -> str:
        if not self.has_bell:
            return f"{self.brand} {self.model} has no bell to ring."
        return f"{self.brand} {self.model}: Ring ring!"
