import Image from "next/image";

const IconList = ({ onChange = () => { }, ...props }) => {
    const icons = ['Airplane Arrival.svg', 'Airplane Departure.svg', 'Airplane.svg', 'Ambulance.svg', 'Anchor.svg', 'Articulated Lorry.svg', 'Auto Rickshaw.svg', 'Automobile.svg', 'Baggage Claim.svg', 'Bank.svg', 'Beach With Umbrella.svg', 'Bicycle.svg', 'Bridge At Night.svg', 'Building Construction.svg', 'Bullet Train.svg', 'Bus Stop.svg', 'Bus.svg', 'Camping.svg', 'Carousel Horse.svg', 'Castle.svg', 'Church.svg', 'Cityscape At Dusk.svg', 'Cityscape.svg', 'Classical Building.svg', 'Construction.svg', 'Convenience Store.svg', 'Customs.svg', 'Delivery Truck.svg', 'Department Store.svg', 'Derelict House.svg', 'Desert Island.svg', 'Desert.svg', 'Dollar Banknote.svg', 'Euro Banknote.svg', 'Factory.svg', 'Ferry.svg', 'Fire Engine.svg', 'Fireworks.svg', 'Flying Saucer.svg', 'Helicopter.svg', 'High Speed Train.svg', 'Hindu Temple.svg', 'Horizontal Traffic Light.svg', 'Hospital.svg', 'Hotel.svg', 'House With Garden.svg', 'House.svg', 'Houses.svg', 'Hut.svg', 'Japanese Castle.svg', 'Japanese Post Office.svg', 'Kaaba.svg', 'Left Luggage.svg', 'Light Rail.svg', 'Locomotive.svg', 'Love Hotel.svg', 'Map Of Japan.svg', 'Metro.svg', 'Milky Way.svg', 'Minibus.svg', 'Moai.svg', 'Monorail.svg', 'Moon Viewing Ceremony.svg', 'Mosque.svg', 'Motor Boat.svg', 'Motor Scooter.svg', 'Motorcycle.svg', 'Motorway.svg', 'Mount Fuji.svg', 'Mountain Cableway.svg', 'Mountain Railway.svg', 'Mountain.svg', 'National Park.svg', 'Night With Stars.svg', 'Office Building.svg', 'Oncoming Automobile.svg', 'Oncoming Bus.svg', 'Oncoming Police Car.svg', 'Oncoming Taxi.svg', 'Page Facing Up.svg', 'Parachute.svg', 'Passenger Ship.svg', 'Passport Control.svg', 'Pickup Truck.svg', 'Police Car Light.svg', 'Police Car.svg', 'Post Office.svg', 'Pound Banknote.svg', 'Racing Car.svg', 'Railway Car.svg', 'Railway Track.svg', 'Ringed Planet.svg', 'Rocket.svg', 'Roller Coaster.svg', 'Sailboat.svg', 'Satellite.svg', 'School.svg', 'Seat.svg', 'Shinto Shrine.svg', 'Ship.svg',
        , "Small Airplane.svg", "Snow Capped Mountain.svg", "Sparkler.svg", "Speedboat.svg", "Sport Utility Vehicle.svg", "Stadium.svg", "Station.svg", "Sunrise Over Mountains.svg", "Sunrise.svg", "Sunset.svg", "Suspension Railway.svg", "Synagogue.svg", "Taxi.svg", "Tent.svg", "Three Oclock.svg", "Tokyo Tower.svg", "Tractor.svg", "Train.svg", "Tram Car.svg", "Tram.svg", "Trolleybus.svg", "Vertical Traffic Light.svg", "Volcano.svg", "Wedding.svg", "Yen Banknote.svg"];

    const handleClick = (iconPath) => {
        onChange(iconPath)
    }

    return (
        <div className={`${props.className ? props.className : ""}`}>
            <div className="w-[300px] flex flex-wrap gap-[5px] shadow-md rounded-lg p-[8px]">
                {icons?.map((v, i) => (
                    <Image key={i} alt="ico" src={`/img/detail-svg/${v}`} width={24} height={24}
                        className="cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-150"
                        onClick={() => { handleClick(`/img/detail-svg/${v}`) }}
                    />
                ))}
            </div>
        </div>
    )

}
export default IconList;