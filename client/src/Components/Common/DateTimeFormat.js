export default function CurrentDateTime() {
    var someDate = new Date();
    var numberOfDaysToAdd = 3;
    var date = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    var defaultValue = new Date(date).toISOString().split("T")[0];
    return (
      <div className="App">
        <input
          id="dateRequired"
          type="date"
          name="dateRequired"
          defaultValue={defaultValue}
        />
      </div>
    );
  }
  