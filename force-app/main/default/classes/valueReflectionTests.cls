@IsTest
private class valueReflectionTests {
  @IsTest
  static void testReflection() {
    String testVal = 'Test';
    String response = valueReflection.reflectValue(testVal);
    System.assertEquals(testVal, response, 'String did not reflect correctly.');
  }
}
