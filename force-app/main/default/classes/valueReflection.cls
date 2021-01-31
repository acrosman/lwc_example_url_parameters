public with sharing class valueReflection {
  @AuraEnabled(cacheable=true)
  public static String reflectValue(String value) {
    // Really you should do something useful here.
    return value;
  }
}
