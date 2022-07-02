//
//  RCTCustomModule.m
//  power_to_fly
//
//  Created by Edung Divinefavour on 02/07/2022.
//

#import "RCTCustomModule.h"

@implementation RCTCustomModule

// To export a module named RCTCustomModule
RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"CustomEventName"];
}

RCT_EXPORT_METHOD(sendEvent:(NSString *)name) {
  [self sendEventWithName: name body:@{@"property": @"TestValue"}];
}

@end
