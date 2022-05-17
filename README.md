# portfolio
My Portfolio, background uses https://github.com/hustcc/canvas-nest.js 

------------------------------------
Translated Report (Full Report Below)
-------------------------------------

Process:               Unity Hub [71688]
Path:                  /Applications/Unity Hub.app/Contents/MacOS/Unity Hub
Identifier:            com.unity3d.unityhub
Version:               3.1.2 (3.1.2)
Code Type:             X86-64 (Native)
Parent Process:        launchd [1]
User ID:               501

Date/Time:             2022-05-17 14:26:01.6681 +0000
OS Version:            macOS 12.3.1 (21E258)
Report Version:        12
Bridge OS Version:     6.4 (19P4243)
Anonymous UUID:        D5047840-C91F-4D83-922E-193B2C47B810

Sleep/Wake UUID:       90CC1B17-7536-464B-9A2F-C9753B0D1BA2

Time Awake Since Boot: 330000 seconds

System Integrity Protection: enabled

Crashed Thread:        0  CrBrowserMain  Dispatch queue: com.apple.main-thread

Exception Type:        EXC_BAD_ACCESS (SIGSEGV)
Exception Codes:       KERN_INVALID_ADDRESS at 0x0000000000000000
Exception Codes:       0x0000000000000001, 0x0000000000000000
Exception Note:        EXC_CORPSE_NOTIFY

Termination Reason:    Namespace SIGNAL, Code 11 Segmentation fault: 11
Terminating Process:   exc handler [71688]

VM Region Info: 0 is not in any region.  Bytes before following region: 4510437376
      REGION TYPE                    START - END         [ VSIZE] PRT/MAX SHRMOD  REGION DETAIL
      UNUSED SPACE AT START
--->  
      __TEXT                      10cd7d000-10cdcd000    [  320K] r-x/r-x SM=COW  ...cOS/Unity Hub

Thread 0 Crashed:: CrBrowserMain Dispatch queue: com.apple.main-thread
0   CoreFoundation                	    0x7ff81490e6d9 CFStringGetCString + 61
1   Electron Framework            	       0x115baebcc ElectronInitializeICUandStartNode + 29356
2   Electron Framework            	       0x115bbd7a5 ElectronInitializeICUandStartNode + 89733
3   Electron Framework            	       0x115bbd70f ElectronInitializeICUandStartNode + 89583
4   Electron Framework            	       0x115bbd5a8 ElectronInitializeICUandStartNode + 89224
5   Electron Framework            	       0x11639af2f v8::internal::baseline::BytecodeOffsetIterator::UpdatePointers() + 8975
6   ???                           	      0x20000b2398 ???
7   ???                           	      0x2000049541 ???
8   ???                           	      0x2000049541 ???
9   ???                           	      0x200007888e ???
10  ???                           	      0x2000049541 ???
11  ???                           	      0x20000fb338 ???
12  ???                           	      0x2000069a28 ???
13  ???                           	      0x2000047543 ???
14  Electron Framework            	       0x116411112 v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*) + 5810
15  Electron Framework            	       0x116411903 v8::internal::Execution::TryCall(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*, v8::internal::Execution::MessageHandling, v8::internal::MaybeHandle<v8::internal::Object>*, bool) + 355
16  Electron Framework            	       0x1164119e0 v8::internal::Execution::TryCall(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*, v8::internal::Execution::MessageHandling, v8::internal::MaybeHandle<v8::internal::Object>*, bool) + 576
17  Electron Framework            	       0x11642c5d0 v8::internal::MicrotaskQueue::PerformCheckpoint(v8::Isolate*) + 416
18  Electron Framework            	       0x11639af2f v8::internal::baseline::BytecodeOffsetIterator::UpdatePointers() + 8975
19  ???                           	      0x20000b2398 ???
20  ???                           	      0x2000049541 ???
21  ???                           	      0x20000475fb ???
22  ???                           	      0x2000047383 ???
23  Electron Framework            	       0x11640fcfb v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*) + 667
24  Electron Framework            	       0x11636dc43 v8::Function::Call(v8::Local<v8::Context>, v8::Local<v8::Value>, int, v8::Local<v8::Value>*) + 579
25  Electron Framework            	       0x118f9b092 node::CallbackScope::~CallbackScope() + 1378
26  Electron Framework            	       0x118f9b35c node::CallbackScope::~CallbackScope() + 2092
27  Electron Framework            	       0x118faf3cf node::EmitAsyncDestroy(node::Environment*, node::async_context) + 60447
28  Electron Framework            	       0x1190d470f node::PromiseRejectCallback(v8::PromiseRejectMessage) + 199039
29  Electron Framework            	       0x1190d6781 node::PromiseRejectCallback(v8::PromiseRejectMessage) + 207345
30  Electron Framework            	       0x1190dbc6f node::PromiseRejectCallback(v8::PromiseRejectMessage) + 229087
31  Electron Framework            	       0x115b9f5dd uv_signal_stop + 2573
32  Electron Framework            	       0x115ba72eb uv_free_interface_addresses + 2283
33  Electron Framework            	       0x115b95fbf uv_run + 319
34  Electron Framework            	       0x115cedd64 ElectronInitializeICUandStartNode + 1336388
35  Electron Framework            	       0x11751026c v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9814284
36  Electron Framework            	       0x117528546 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9913318
37  Electron Framework            	       0x117560550 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10142704
38  Electron Framework            	       0x11755cb32 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10127826
39  Electron Framework            	       0x11755fd6f v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10140687
40  CoreFoundation                	    0x7ff814985aeb __CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE0_PERFORM_FUNCTION__ + 17
41  CoreFoundation                	    0x7ff814985a53 __CFRunLoopDoSource0 + 180
42  CoreFoundation                	    0x7ff8149857cd __CFRunLoopDoSources0 + 242
43  CoreFoundation                	    0x7ff8149841e8 __CFRunLoopRun + 892
44  CoreFoundation                	    0x7ff8149837ac CFRunLoopRunSpecific + 562
45  HIToolbox                     	    0x7ff81d60ace6 RunCurrentEventLoopInMode + 292
46  HIToolbox                     	    0x7ff81d60aa4a ReceiveNextEventCommon + 594
47  HIToolbox                     	    0x7ff81d60a7e5 _BlockUntilNextEventMatchingListInModeWithFilter + 70
48  AppKit                        	    0x7ff8173aa53d _DPSNextEvent + 927
49  AppKit                        	    0x7ff8173a8bfa -[NSApplication(NSEvent) _nextEventMatchingEventMask:untilDate:inMode:dequeue:] + 1394
50  AppKit                        	    0x7ff81739b2a9 -[NSApplication run] + 586
51  Electron Framework            	       0x117560bf6 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10144406
52  Electron Framework            	       0x11755f84b v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10139371
53  Electron Framework            	       0x11752991f v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9918399
54  Electron Framework            	       0x1174fbf7c v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9731612
55  Electron Framework            	       0x116e7f891 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 2930481
56  Electron Framework            	       0x116e81012 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 2936498
57  Electron Framework            	       0x116e7cf14 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 2919860
58  Electron Framework            	       0x1162d1e47 electron::fuses::IsCookieEncryptionEnabled() + 5725607
59  Electron Framework            	       0x1162d1948 electron::fuses::IsCookieEncryptionEnabled() + 5724328
60  Electron Framework            	       0x1162d0a96 electron::fuses::IsCookieEncryptionEnabled() + 5720566
61  Electron Framework            	       0x1162d0b82 electron::fuses::IsCookieEncryptionEnabled() + 5720802
62  Electron Framework            	       0x115ba78e6 ElectronMain + 134
63  Unity Hub                     	       0x10cd7e7e6 0x10cd7d000 + 6118
64  dyld                          	       0x115adb51e start + 462

Thread 1:
0   libsystem_pthread.dylib       	    0x7ff8148baf48 start_wqthread + 0

Thread 2:
0   libsystem_pthread.dylib       	    0x7ff8148baf48 start_wqthread + 0

Thread 3:
0   libsystem_pthread.dylib       	    0x7ff8148baf48 start_wqthread + 0

Thread 4:: ThreadPoolServiceThread
0   libsystem_kernel.dylib        	    0x7ff81488b8ca kevent64 + 10
1   Electron Framework            	       0x117572c44 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10218212
2   Electron Framework            	       0x11752991f v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9918399
3   Electron Framework            	       0x1174fbf7c v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9731612
4   Electron Framework            	       0x117546338 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10035672
5   Electron Framework            	       0x1175337fd v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9959069
6   Electron Framework            	       0x117546537 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10036183
7   Electron Framework            	       0x11755b248 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10121448
8   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
9   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 5:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	    0x7ff81488297a mach_msg_trap + 10
1   libsystem_kernel.dylib        	    0x7ff814882ce8 mach_msg + 56
2   Electron Framework            	       0x117564227 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10158279
3   Electron Framework            	       0x11753d80e v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10000046
4   Electron Framework            	       0x11753e027 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10002119
5   Electron Framework            	       0x11753dd1d v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10001341
6   Electron Framework            	       0x11755b248 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10121448
7   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
8   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 6:: ThreadPoolBackgroundWorker
0   libsystem_kernel.dylib        	    0x7ff81488297a mach_msg_trap + 10
1   libsystem_kernel.dylib        	    0x7ff814882ce8 mach_msg + 56
2   Electron Framework            	       0x117564227 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10158279
3   Electron Framework            	       0x11753d80e v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10000046
4   Electron Framework            	       0x11753de41 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10001633
5   Electron Framework            	       0x11753dcbd v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10001245
6   Electron Framework            	       0x11755b248 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10121448
7   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
8   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 7:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	    0x7ff81488297a mach_msg_trap + 10
1   libsystem_kernel.dylib        	    0x7ff814882ce8 mach_msg + 56
2   Electron Framework            	       0x117564227 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10158279
3   Electron Framework            	       0x11753d80e v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10000046
4   Electron Framework            	       0x11753e027 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10002119
5   Electron Framework            	       0x11753dd1d v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10001341
6   Electron Framework            	       0x11755b248 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10121448
7   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
8   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 8:: Chrome_IOThread
0   libsystem_kernel.dylib        	    0x7ff81488b8ca kevent64 + 10
1   Electron Framework            	       0x117572c44 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10218212
2   Electron Framework            	       0x11752991f v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9918399
3   Electron Framework            	       0x1174fbf7c v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9731612
4   Electron Framework            	       0x117546338 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10035672
5   Electron Framework            	       0x116e81caf v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 2939727
6   Electron Framework            	       0x117546537 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10036183
7   Electron Framework            	       0x11755b248 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10121448
8   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
9   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 9:: MemoryInfra
0   libsystem_kernel.dylib        	    0x7ff81488297a mach_msg_trap + 10
1   libsystem_kernel.dylib        	    0x7ff814882ce8 mach_msg + 56
2   Electron Framework            	       0x117564227 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10158279
3   Electron Framework            	       0x1175640ae v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10157902
4   Electron Framework            	       0x1174dfd67 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9616391
5   Electron Framework            	       0x11752991f v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9918399
6   Electron Framework            	       0x1174fbf7c v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9731612
7   Electron Framework            	       0x117546338 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10035672
8   Electron Framework            	       0x117546537 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10036183
9   Electron Framework            	       0x11755b248 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10121448
10  libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
11  libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 10:
0   libsystem_kernel.dylib        	    0x7ff81488734e kevent + 10
1   Electron Framework            	       0x115ba6f1e uv_free_interface_addresses + 1310
2   Electron Framework            	       0x115b95fbf uv_run + 319
3   Electron Framework            	       0x11908de6f node::MultiIsolatePlatform::CancelPendingDelayedTasks(v8::Isolate*) + 687
4   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
5   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 11:
0   libsystem_kernel.dylib        	    0x7ff8148853ea __psynch_cvwait + 10
1   libsystem_pthread.dylib       	    0x7ff8148bfa6f _pthread_cond_wait + 1249
2   Electron Framework            	       0x115ba1fc9 uv_cond_wait + 9
3   Electron Framework            	       0x11908e042 node::MultiIsolatePlatform::CancelPendingDelayedTasks(v8::Isolate*) + 1154
4   Electron Framework            	       0x11908b857 node::OnFatalError(char const*, char const*) + 428983
5   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
6   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 12:
0   libsystem_kernel.dylib        	    0x7ff8148853ea __psynch_cvwait + 10
1   libsystem_pthread.dylib       	    0x7ff8148bfa6f _pthread_cond_wait + 1249
2   Electron Framework            	       0x115ba1fc9 uv_cond_wait + 9
3   Electron Framework            	       0x11908e042 node::MultiIsolatePlatform::CancelPendingDelayedTasks(v8::Isolate*) + 1154
4   Electron Framework            	       0x11908b857 node::OnFatalError(char const*, char const*) + 428983
5   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
6   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 13:
0   libsystem_kernel.dylib        	    0x7ff8148853ea __psynch_cvwait + 10
1   libsystem_pthread.dylib       	    0x7ff8148bfa6f _pthread_cond_wait + 1249
2   Electron Framework            	       0x115ba1fc9 uv_cond_wait + 9
3   Electron Framework            	       0x11908e042 node::MultiIsolatePlatform::CancelPendingDelayedTasks(v8::Isolate*) + 1154
4   Electron Framework            	       0x11908b857 node::OnFatalError(char const*, char const*) + 428983
5   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
6   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 14:
0   libsystem_kernel.dylib        	    0x7ff8148829b6 semaphore_wait_trap + 10
1   Electron Framework            	       0x115ba2570 uv_sem_wait + 16
2   Electron Framework            	       0x1190f4b93 node::SetTracingController(v8::TracingController*) + 65043
3   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
4   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 15:
0   libsystem_kernel.dylib        	    0x7ff8148853ea __psynch_cvwait + 10
1   libsystem_pthread.dylib       	    0x7ff8148bfa6f _pthread_cond_wait + 1249
2   Electron Framework            	       0x115ba1fc9 uv_cond_wait + 9
3   Electron Framework            	       0x115b92249 uv_cancel + 505
4   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
5   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 16:
0   libsystem_kernel.dylib        	    0x7ff8148853ea __psynch_cvwait + 10
1   libsystem_pthread.dylib       	    0x7ff8148bfa6f _pthread_cond_wait + 1249
2   Electron Framework            	       0x115ba1fc9 uv_cond_wait + 9
3   Electron Framework            	       0x115b92249 uv_cancel + 505
4   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
5   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 17:
0   libsystem_kernel.dylib        	    0x7ff8148853ea __psynch_cvwait + 10
1   libsystem_pthread.dylib       	    0x7ff8148bfa6f _pthread_cond_wait + 1249
2   Electron Framework            	       0x115ba1fc9 uv_cond_wait + 9
3   Electron Framework            	       0x115b92249 uv_cancel + 505
4   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
5   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 18:
0   libsystem_kernel.dylib        	    0x7ff8148853ea __psynch_cvwait + 10
1   libsystem_pthread.dylib       	    0x7ff8148bfa6f _pthread_cond_wait + 1249
2   Electron Framework            	       0x115ba1fc9 uv_cond_wait + 9
3   Electron Framework            	       0x115b92249 uv_cancel + 505
4   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
5   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 19:: NetworkConfigWatcher
0   libsystem_kernel.dylib        	    0x7ff81488297a mach_msg_trap + 10
1   libsystem_kernel.dylib        	    0x7ff814882ce8 mach_msg + 56
2   CoreFoundation                	    0x7ff814985cdd __CFRunLoopServiceMachPort + 319
3   CoreFoundation                	    0x7ff814984368 __CFRunLoopRun + 1276
4   CoreFoundation                	    0x7ff8149837ac CFRunLoopRunSpecific + 562
5   Foundation                    	    0x7ff8157d7d9a -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 216
6   Electron Framework            	       0x117560b49 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10144233
7   Electron Framework            	       0x11755f84b v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10139371
8   Electron Framework            	       0x11752991f v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9918399
9   Electron Framework            	       0x1174fbf7c v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9731612
10  Electron Framework            	       0x117546338 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10035672
11  Electron Framework            	       0x117546537 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10036183
12  Electron Framework            	       0x11755b248 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10121448
13  libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
14  libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 20:: CrShutdownDetector
0   libsystem_kernel.dylib        	    0x7ff8148833ba read + 10
1   Electron Framework            	       0x115d46e06 ElectronInitializeICUandStartNode + 1701094
2   Electron Framework            	       0x11755b248 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10121448
3   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
4   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 21:: NetworkConfigWatcher
0   libsystem_kernel.dylib        	    0x7ff81488297a mach_msg_trap + 10
1   libsystem_kernel.dylib        	    0x7ff814882ce8 mach_msg + 56
2   CoreFoundation                	    0x7ff814985cdd __CFRunLoopServiceMachPort + 319
3   CoreFoundation                	    0x7ff814984368 __CFRunLoopRun + 1276
4   CoreFoundation                	    0x7ff8149837ac CFRunLoopRunSpecific + 562
5   Foundation                    	    0x7ff8157d7d9a -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 216
6   Electron Framework            	       0x117560b49 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10144233
7   Electron Framework            	       0x11755f84b v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10139371
8   Electron Framework            	       0x11752991f v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9918399
9   Electron Framework            	       0x1174fbf7c v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 9731612
10  Electron Framework            	       0x117546338 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10035672
11  Electron Framework            	       0x117546537 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10036183
12  Electron Framework            	       0x11755b248 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10121448
13  libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
14  libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 22:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	    0x7ff81488297a mach_msg_trap + 10
1   libsystem_kernel.dylib        	    0x7ff814882ce8 mach_msg + 56
2   Electron Framework            	       0x117564227 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10158279
3   Electron Framework            	       0x11753d80e v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10000046
4   Electron Framework            	       0x11753e027 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10002119
5   Electron Framework            	       0x11753dd1d v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10001341
6   Electron Framework            	       0x11755b248 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10121448
7   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
8   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 23:: CompositorTileWorker1
0   libsystem_kernel.dylib        	    0x7ff8148853ea __psynch_cvwait + 10
1   libsystem_pthread.dylib       	    0x7ff8148bfa6f _pthread_cond_wait + 1249
2   Electron Framework            	       0x11755a830 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10118864
3   Electron Framework            	       0x117ee4815 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 20121269
4   Electron Framework            	       0x11755b248 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10121448
5   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
6   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 24:: ThreadPoolForegroundWorker
0   libsystem_kernel.dylib        	    0x7ff81488297a mach_msg_trap + 10
1   libsystem_kernel.dylib        	    0x7ff814882ce8 mach_msg + 56
2   Electron Framework            	       0x117564227 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10158279
3   Electron Framework            	       0x11753d80e v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10000046
4   Electron Framework            	       0x11753de41 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10001633
5   Electron Framework            	       0x11753dd1d v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10001341
6   Electron Framework            	       0x11755b248 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10121448
7   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
8   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 25:: ThreadPoolSingleThreadForegroundBlocking0
0   libsystem_kernel.dylib        	    0x7ff81488297a mach_msg_trap + 10
1   libsystem_kernel.dylib        	    0x7ff814882ce8 mach_msg + 56
2   Electron Framework            	       0x117564227 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10158279
3   Electron Framework            	       0x1175640ae v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10157902
4   Electron Framework            	       0x11753d81d v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10000061
5   Electron Framework            	       0x11753e027 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10002119
6   Electron Framework            	       0x11753dd7d v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10001437
7   Electron Framework            	       0x11755b248 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10121448
8   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
9   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 26:
0   libsystem_kernel.dylib        	    0x7ff8148829b6 semaphore_wait_trap + 10
1   Electron Framework            	       0x115ba2570 uv_sem_wait + 16
2   Electron Framework            	       0x115cedc39 ElectronInitializeICUandStartNode + 1336089
3   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
4   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 27:
0   libsystem_pthread.dylib       	    0x7ff8148baf48 start_wqthread + 0

Thread 28:
0   libsystem_pthread.dylib       	    0x7ff8148baf48 start_wqthread + 0

Thread 29:
0   libsystem_pthread.dylib       	    0x7ff8148baf48 start_wqthread + 0

Thread 30:
0   libsystem_pthread.dylib       	    0x7ff8148baf48 start_wqthread + 0

Thread 31:: com.apple.NSEventThread
0   libsystem_kernel.dylib        	    0x7ff81488297a mach_msg_trap + 10
1   libsystem_kernel.dylib        	    0x7ff814882ce8 mach_msg + 56
2   CoreFoundation                	    0x7ff814985cdd __CFRunLoopServiceMachPort + 319
3   CoreFoundation                	    0x7ff814984368 __CFRunLoopRun + 1276
4   CoreFoundation                	    0x7ff8149837ac CFRunLoopRunSpecific + 562
5   AppKit                        	    0x7ff817517f5e _NSEventThread + 132
6   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
7   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15

Thread 32:: ThreadPoolSingleThreadSharedBackgroundBlocking1
0   libsystem_kernel.dylib        	    0x7ff81488297a mach_msg_trap + 10
1   libsystem_kernel.dylib        	    0x7ff814882ce8 mach_msg + 56
2   Electron Framework            	       0x117564227 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10158279
3   Electron Framework            	       0x1175640ae v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10157902
4   Electron Framework            	       0x11753d81d v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10000061
5   Electron Framework            	       0x11753de41 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10001633
6   Electron Framework            	       0x11753dced v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10001293
7   Electron Framework            	       0x11755b248 v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*) + 10121448
8   libsystem_pthread.dylib       	    0x7ff8148bf4e1 _pthread_start + 125
9   libsystem_pthread.dylib       	    0x7ff8148baf6b thread_start + 15


Thread 0 crashed with X86 Thread State (64-bit):
  rax: 0x804177f04b95003b  rbx: 0x0000000000000000  rcx: 0x0000000008000100  rdx: 0x0000000000000080
  rdi: 0x0000000000000000  rsi: 0x00007ff7b3177360  rbp: 0x00007ff7b3177330  rsp: 0x00007ff7b31772f0
   r8: 0x0000600003e54128   r9: 0x0000000000000000  r10: 0x00000000ffffff00  r11: 0x0000600003e54120
  r12: 0x0000000000000080  r13: 0x000000200832d1b1  r14: 0x00007ff7b3177360  r15: 0x0000000008000100
  rip: 0x00007ff81490e6d9  rfl: 0x0000000000010246  cr2: 0x0000000000000000
  
Logical CPU:     0
Error Code:      0x00000004 (no mapping for user data read)
Trap Number:     14

Thread 0 instruction stream:
  48 83 ff 15 75 09 b8 20-08 00 00 c3 31 c0 c3 89  H...u.. ....1...
  f9 81 e1 ff ff ff 7f 85-ff b8 ff ff ff ff 0f 48  ...............H
  c1 c3 90 55 48 89 e5 41-57 41 56 41 55 41 54 53  ...UH..AWAVAUATS
  48 83 ec 18 48 8b 05 74-be bb 42 48 8b 00 48 89  H...H..t..BH..H.
  45 d0 48 85 d2 0f 8e 96-01 00 00 41 89 cf 49 89  E.H........A..I.
  d4 49 89 f6 48 89 fb f6-c3 01 0f 85 5c 01 00 00  .I..H.......\...
 [48]8b 03 48 85 c0 74 1c-48 8d 0d d0 f7 5e 41 48  H..H..t.H....^AH	<==
  3b 01 74 10 48 8b 0d 84-5c 7c 41 48 39 c8 0f 85  ;.t.H...\|AH9...
  21 01 00 00 48 8b 43 08-a8 60 74 06 4c 8b 6b 10  !...H.C..`t.L.k.
  eb 17 48 8b 43 08 83 e0-05 31 c9 83 f8 04 0f 95  ..H.C....1......
  c1 4c 8d 2c cb 49 83 c5-10 48 8b 43 08 83 e0 05  .L.,.I...H.C....
  83 f8 04 75 07 41 0f b6-55 00 eb 12 48 8b 43 08  ...u.A..U...H.C.

Binary Images:
    0x7ff814906000 -     0x7ff814e07fff com.apple.CoreFoundation (6.9) <743f0cb7-e962-3e42-8653-7bd141129561> /System/Library/Frameworks/CoreFoundation.framework/Versions/A/CoreFoundation
       0x115b8e000 -        0x11d5fdfff com.github.Electron.framework (*) <20f34f0e-dbe6-32f9-8c74-bdacf1f91bdc> /Applications/Unity Hub.app/Contents/Frameworks/Electron Framework.framework/Versions/A/Electron Framework
               0x0 - 0xffffffffffffffff ??? (*) <00000000-0000-0000-0000-000000000000> ???
    0x7ff81d5db000 -     0x7ff81d8cefff com.apple.HIToolbox (2.1.1) <7761967d-a138-33b6-9e3f-5c5420a2eeff> /System/Library/Frameworks/Carbon.framework/Versions/A/Frameworks/HIToolbox.framework/Versions/A/HIToolbox
    0x7ff81736c000 -     0x7ff8181f9fff com.apple.AppKit (6.9) <92a78ebd-bba5-3f18-a5e1-768c955539d7> /System/Library/Frameworks/AppKit.framework/Versions/C/AppKit
       0x10cd7d000 -        0x10cdccfff com.unity3d.unityhub (3.1.2) <ab3cb5d1-eb3f-388f-8c63-416a00da1aaa> /Applications/Unity Hub.app/Contents/MacOS/Unity Hub
       0x115ad6000 -        0x115b41fff dyld (*) <dd9e80de-fb3b-349b-96a4-46874ad34d11> /usr/lib/dyld
    0x7ff8148b9000 -     0x7ff8148c4fff libsystem_pthread.dylib (*) <2f6c275d-7e14-3d31-a924-e1bb41d2415f> /usr/lib/system/libsystem_pthread.dylib
    0x7ff814881000 -     0x7ff8148b8fff libsystem_kernel.dylib (*) <26a59789-b846-3ed4-96dc-8dbef3c0c8e7> /usr/lib/system/libsystem_kernel.dylib
    0x7ff815778000 -     0x7ff815b33fff com.apple.Foundation (6.9) <3370467f-ef48-301d-97d1-cdc236b7053a> /System/Library/Frameworks/Foundation.framework/Versions/C/Foundation

External Modification Summary:
  Calls made by other processes targeting this process:
    task_for_pid: 0
    thread_create: 0
    thread_set_state: 0
  Calls made by this process:
    task_for_pid: 0
    thread_create: 0
    thread_set_state: 0
  Calls made by all processes on this machine:
    task_for_pid: 0
    thread_create: 0
    thread_set_state: 0

VM Region Summary:
ReadOnly portion of Libraries: Total=1.2G resident=0K(0%) swapped_out_or_unallocated=1.2G(100%)
Writable regions: Total=1.7G written=0K(0%) resident=0K(0%) swapped_out=0K(0%) unallocated=1.7G(100%)

                                VIRTUAL   REGION 
REGION TYPE                        SIZE    COUNT (non-coalesced) 
===========                     =======  ======= 
Accelerate framework               128K        1 
Activity Tracing                   256K        1 
CG backing stores                  480K        4 
ColorSync                           80K        5 
CoreGraphics                         4K        1 
CoreServices                      6656K       36 
Kernel Alloc Once                   12K        2 
MALLOC                           293.3M       49 
MALLOC guard page                   48K       11 
MALLOC_MEDIUM (reserved)         840.0M        7         reserved VM address space (unallocated)
MALLOC_NANO (reserved)           384.0M        1         reserved VM address space (unallocated)
Mach message                        16K        2 
Memory Tag 253                    32.0G      200 
Memory Tag 255                     4.0G       34 
STACK GUARD                       56.1M       33 
Stack                            188.3M       33 
VM_ALLOCATE                        184K       15 
__DATA                            39.6M      514 
__DATA_CONST                      30.5M      330 
__DATA_DIRTY                      1636K      213 
__FONT_DATA                          4K        1 
__LINKEDIT                       655.4M       17 
__OBJC_RO                         82.6M        1 
__OBJC_RW                         3200K        2 
__TEXT                           622.6M      532 
__UNICODE                          592K        1 
dyld private memory               1024K        1 
mapped file                      162.2M       22 
shared memory                      772K       16 
===========                     =======  ======= 
TOTAL                             39.3G     2085 
TOTAL, minus reserved VM space    38.1G     2085 



-----------
Full Report
-----------

{"app_name":"Unity Hub","timestamp":"2022-05-17 14:26:01.00 +0000","app_version":"3.1.2","slice_uuid":"ab3cb5d1-eb3f-388f-8c63-416a00da1aaa","build_version":"3.1.2","platform":1,"bundleID":"com.unity3d.unityhub","share_with_app_devs":0,"is_first_party":0,"bug_type":"309","os_version":"macOS 12.3.1 (21E258)","incident_id":"F3F6BA9B-A3C6-491A-B0E8-FC4CAC998D68","name":"Unity Hub"}
{
  "uptime" : 330000,
  "procLaunch" : "2022-05-17 14:25:59.3408 +0000",
  "procRole" : "Foreground",
  "version" : 2,
  "userID" : 501,
  "deployVersion" : 210,
  "modelCode" : "Macmini8,1",
  "procStartAbsTime" : 337302790388950,
  "coalitionID" : 6067,
  "osVersion" : {
    "train" : "macOS 12.3.1",
    "build" : "21E258",
    "releaseType" : "User"
  },
  "captureTime" : "2022-05-17 14:26:01.6681 +0000",
  "incident" : "F3F6BA9B-A3C6-491A-B0E8-FC4CAC998D68",
  "bug_type" : "309",
  "pid" : 71688,
  "procExitAbsTime" : 337305117336855,
  "cpuType" : "X86-64",
  "procName" : "Unity Hub",
  "procPath" : "\/Applications\/Unity Hub.app\/Contents\/MacOS\/Unity Hub",
  "bundleInfo" : {"CFBundleShortVersionString":"3.1.2","CFBundleVersion":"3.1.2","CFBundleIdentifier":"com.unity3d.unityhub"},
  "storeInfo" : {"deviceIdentifierForVendor":"8F0AF65B-0EA6-5336-A6F3-18A405AB6224","thirdParty":true},
  "parentProc" : "launchd",
  "parentPid" : 1,
  "coalitionName" : "com.unity3d.unityhub",
  "crashReporterKey" : "D5047840-C91F-4D83-922E-193B2C47B810",
  "bridgeVersion" : {"build":"19P4243","train":"6.4"},
  "sleepWakeUUID" : "90CC1B17-7536-464B-9A2F-C9753B0D1BA2",
  "sip" : "enabled",
  "vmRegionInfo" : "0 is not in any region.  Bytes before following region: 4510437376\n      REGION TYPE                    START - END         [ VSIZE] PRT\/MAX SHRMOD  REGION DETAIL\n      UNUSED SPACE AT START\n--->  \n      __TEXT                      10cd7d000-10cdcd000    [  320K] r-x\/r-x SM=COW  ...cOS\/Unity Hub",
  "isCorpse" : 1,
  "exception" : {"codes":"0x0000000000000001, 0x0000000000000000","rawCodes":[1,0],"type":"EXC_BAD_ACCESS","signal":"SIGSEGV","subtype":"KERN_INVALID_ADDRESS at 0x0000000000000000"},
  "termination" : {"flags":0,"code":11,"namespace":"SIGNAL","indicator":"Segmentation fault: 11","byProc":"exc handler","byPid":71688},
  "vmregioninfo" : "0 is not in any region.  Bytes before following region: 4510437376\n      REGION TYPE                    START - END         [ VSIZE] PRT\/MAX SHRMOD  REGION DETAIL\n      UNUSED SPACE AT START\n--->  \n      __TEXT                      10cd7d000-10cdcd000    [  320K] r-x\/r-x SM=COW  ...cOS\/Unity Hub",
  "extMods" : {"caller":{"thread_create":0,"thread_set_state":0,"task_for_pid":0},"system":{"thread_create":0,"thread_set_state":0,"task_for_pid":0},"targeted":{"thread_create":0,"thread_set_state":0,"task_for_pid":0},"warnings":0},
  "faultingThread" : 0,
  "threads" : [{"queue":"com.apple.main-thread","instructionState":{"instructionStream":{"bytes":[72,131,255,21,117,9,184,32,8,0,0,195,49,192,195,137,249,129,225,255,255,255,127,133,255,184,255,255,255,255,15,72,193,195,144,85,72,137,229,65,87,65,86,65,85,65,84,83,72,131,236,24,72,139,5,116,190,187,66,72,139,0,72,137,69,208,72,133,210,15,142,150,1,0,0,65,137,207,73,137,212,73,137,246,72,137,251,246,195,1,15,133,92,1,0,0,72,139,3,72,133,192,116,28,72,141,13,208,247,94,65,72,59,1,116,16,72,139,13,132,92,124,65,72,57,200,15,133,33,1,0,0,72,139,67,8,168,96,116,6,76,139,107,16,235,23,72,139,67,8,131,224,5,49,201,131,248,4,15,149,193,76,141,44,203,73,131,197,16,72,139,67,8,131,224,5,131,248,4,117,7,65,15,182,85,0,235,18,72,139,67,8],"offset":96}},"frames":[{"imageOffset":34521,"symbol":"CFStringGetCString","symbolLocation":61,"imageIndex":0},{"imageOffset":134092,"symbol":"ElectronInitializeICUandStartNode","symbolLocation":29356,"imageIndex":1},{"imageOffset":194469,"symbol":"ElectronInitializeICUandStartNode","symbolLocation":89733,"imageIndex":1},{"imageOffset":194319,"symbol":"ElectronInitializeICUandStartNode","symbolLocation":89583,"imageIndex":1},{"imageOffset":193960,"symbol":"ElectronInitializeICUandStartNode","symbolLocation":89224,"imageIndex":1},{"imageOffset":8441647,"symbol":"v8::internal::baseline::BytecodeOffsetIterator::UpdatePointers()","symbolLocation":8975,"imageIndex":1},{"imageOffset":137439683480,"imageIndex":2},{"imageOffset":137439253825,"imageIndex":2},{"imageOffset":137439253825,"imageIndex":2},{"imageOffset":137439447182,"imageIndex":2},{"imageOffset":137439253825,"imageIndex":2},{"imageOffset":137439982392,"imageIndex":2},{"imageOffset":137439386152,"imageIndex":2},{"imageOffset":137439245635,"imageIndex":2},{"imageOffset":8925458,"symbol":"v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*)","symbolLocation":5810,"imageIndex":1},{"imageOffset":8927491,"symbol":"v8::internal::Execution::TryCall(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*, v8::internal::Execution::MessageHandling, v8::internal::MaybeHandle<v8::internal::Object>*, bool)","symbolLocation":355,"imageIndex":1},{"imageOffset":8927712,"symbol":"v8::internal::Execution::TryCall(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*, v8::internal::Execution::MessageHandling, v8::internal::MaybeHandle<v8::internal::Object>*, bool)","symbolLocation":576,"imageIndex":1},{"imageOffset":9037264,"symbol":"v8::internal::MicrotaskQueue::PerformCheckpoint(v8::Isolate*)","symbolLocation":416,"imageIndex":1},{"imageOffset":8441647,"symbol":"v8::internal::baseline::BytecodeOffsetIterator::UpdatePointers()","symbolLocation":8975,"imageIndex":1},{"imageOffset":137439683480,"imageIndex":2},{"imageOffset":137439253825,"imageIndex":2},{"imageOffset":137439245819,"imageIndex":2},{"imageOffset":137439245187,"imageIndex":2},{"imageOffset":8920315,"symbol":"v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*)","symbolLocation":667,"imageIndex":1},{"imageOffset":8256579,"symbol":"v8::Function::Call(v8::Local<v8::Context>, v8::Local<v8::Value>, int, v8::Local<v8::Value>*)","symbolLocation":579,"imageIndex":1},{"imageOffset":54579346,"symbol":"node::CallbackScope::~CallbackScope()","symbolLocation":1378,"imageIndex":1},{"imageOffset":54580060,"symbol":"node::CallbackScope::~CallbackScope()","symbolLocation":2092,"imageIndex":1},{"imageOffset":54662095,"symbol":"node::EmitAsyncDestroy(node::Environment*, node::async_context)","symbolLocation":60447,"imageIndex":1},{"imageOffset":55863055,"symbol":"node::PromiseRejectCallback(v8::PromiseRejectMessage)","symbolLocation":199039,"imageIndex":1},{"imageOffset":55871361,"symbol":"node::PromiseRejectCallback(v8::PromiseRejectMessage)","symbolLocation":207345,"imageIndex":1},{"imageOffset":55893103,"symbol":"node::PromiseRejectCallback(v8::PromiseRejectMessage)","symbolLocation":229087,"imageIndex":1},{"imageOffset":71133,"symbol":"uv_signal_stop","symbolLocation":2573,"imageIndex":1},{"imageOffset":103147,"symbol":"uv_free_interface_addresses","symbolLocation":2283,"imageIndex":1},{"imageOffset":32703,"symbol":"uv_run","symbolLocation":319,"imageIndex":1},{"imageOffset":1441124,"symbol":"ElectronInitializeICUandStartNode","symbolLocation":1336388,"imageIndex":1},{"imageOffset":26747500,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9814284,"imageIndex":1},{"imageOffset":26846534,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9913318,"imageIndex":1},{"imageOffset":27075920,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10142704,"imageIndex":1},{"imageOffset":27061042,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10127826,"imageIndex":1},{"imageOffset":27073903,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10140687,"imageIndex":1},{"imageOffset":522987,"symbol":"__CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE0_PERFORM_FUNCTION__","symbolLocation":17,"imageIndex":0},{"imageOffset":522835,"symbol":"__CFRunLoopDoSource0","symbolLocation":180,"imageIndex":0},{"imageOffset":522189,"symbol":"__CFRunLoopDoSources0","symbolLocation":242,"imageIndex":0},{"imageOffset":516584,"symbol":"__CFRunLoopRun","symbolLocation":892,"imageIndex":0},{"imageOffset":513964,"symbol":"CFRunLoopRunSpecific","symbolLocation":562,"imageIndex":0},{"imageOffset":195814,"symbol":"RunCurrentEventLoopInMode","symbolLocation":292,"imageIndex":3},{"imageOffset":195146,"symbol":"ReceiveNextEventCommon","symbolLocation":594,"imageIndex":3},{"imageOffset":194533,"symbol":"_BlockUntilNextEventMatchingListInModeWithFilter","symbolLocation":70,"imageIndex":3},{"imageOffset":255293,"symbol":"_DPSNextEvent","symbolLocation":927,"imageIndex":4},{"imageOffset":248826,"symbol":"-[NSApplication(NSEvent) _nextEventMatchingEventMask:untilDate:inMode:dequeue:]","symbolLocation":1394,"imageIndex":4},{"imageOffset":193193,"symbol":"-[NSApplication run]","symbolLocation":586,"imageIndex":4},{"imageOffset":27077622,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10144406,"imageIndex":1},{"imageOffset":27072587,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10139371,"imageIndex":1},{"imageOffset":26851615,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9918399,"imageIndex":1},{"imageOffset":26664828,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9731612,"imageIndex":1},{"imageOffset":19863697,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":2930481,"imageIndex":1},{"imageOffset":19869714,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":2936498,"imageIndex":1},{"imageOffset":19853076,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":2919860,"imageIndex":1},{"imageOffset":7618119,"symbol":"electron::fuses::IsCookieEncryptionEnabled()","symbolLocation":5725607,"imageIndex":1},{"imageOffset":7616840,"symbol":"electron::fuses::IsCookieEncryptionEnabled()","symbolLocation":5724328,"imageIndex":1},{"imageOffset":7613078,"symbol":"electron::fuses::IsCookieEncryptionEnabled()","symbolLocation":5720566,"imageIndex":1},{"imageOffset":7613314,"symbol":"electron::fuses::IsCookieEncryptionEnabled()","symbolLocation":5720802,"imageIndex":1},{"imageOffset":104678,"symbol":"ElectronMain","symbolLocation":134,"imageIndex":1},{"imageOffset":6118,"imageIndex":5},{"imageOffset":21790,"symbol":"start","symbolLocation":462,"imageIndex":6}],"id":1748020,"triggered":true,"threadState":{"r13":{"value":137576501681},"rax":{"value":9241799784284880955},"rflags":{"value":66118},"cpu":{"value":0},"r14":{"value":140701838308192},"rsi":{"value":140701838308192},"r8":{"value":105553181622568},"cr2":{"value":0},"rdx":{"value":128},"r10":{"value":4294967040},"r9":{"value":0},"r15":{"value":134217984},"rbx":{"value":0},"trap":{"value":14,"description":"(no mapping for user data read)"},"err":{"value":4},"r11":{"value":105553181622560},"rip":{"value":140703473657561,"matchesCrashFrame":1},"rbp":{"value":140701838308144},"rsp":{"value":140701838308080},"r12":{"value":128},"rcx":{"value":134217984},"flavor":"x86_THREAD_STATE","rdi":{"value":0}},"name":"CrBrowserMain"},{"id":1748040,"frames":[{"imageOffset":8008,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":7}]},{"id":1748041,"frames":[{"imageOffset":8008,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":7}]},{"id":1748048,"frames":[{"imageOffset":8008,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":7}]},{"id":1748054,"name":"ThreadPoolServiceThread","frames":[{"imageOffset":43210,"symbol":"kevent64","symbolLocation":10,"imageIndex":8},{"imageOffset":27151428,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10218212,"imageIndex":1},{"imageOffset":26851615,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9918399,"imageIndex":1},{"imageOffset":26664828,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9731612,"imageIndex":1},{"imageOffset":26968888,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10035672,"imageIndex":1},{"imageOffset":26892285,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9959069,"imageIndex":1},{"imageOffset":26969399,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10036183,"imageIndex":1},{"imageOffset":27054664,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10121448,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748055,"name":"ThreadPoolForegroundWorker","frames":[{"imageOffset":6522,"symbol":"mach_msg_trap","symbolLocation":10,"imageIndex":8},{"imageOffset":7400,"symbol":"mach_msg","symbolLocation":56,"imageIndex":8},{"imageOffset":27091495,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10158279,"imageIndex":1},{"imageOffset":26933262,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10000046,"imageIndex":1},{"imageOffset":26935335,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10002119,"imageIndex":1},{"imageOffset":26934557,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10001341,"imageIndex":1},{"imageOffset":27054664,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10121448,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748056,"name":"ThreadPoolBackgroundWorker","frames":[{"imageOffset":6522,"symbol":"mach_msg_trap","symbolLocation":10,"imageIndex":8},{"imageOffset":7400,"symbol":"mach_msg","symbolLocation":56,"imageIndex":8},{"imageOffset":27091495,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10158279,"imageIndex":1},{"imageOffset":26933262,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10000046,"imageIndex":1},{"imageOffset":26934849,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10001633,"imageIndex":1},{"imageOffset":26934461,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10001245,"imageIndex":1},{"imageOffset":27054664,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10121448,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748057,"name":"ThreadPoolForegroundWorker","frames":[{"imageOffset":6522,"symbol":"mach_msg_trap","symbolLocation":10,"imageIndex":8},{"imageOffset":7400,"symbol":"mach_msg","symbolLocation":56,"imageIndex":8},{"imageOffset":27091495,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10158279,"imageIndex":1},{"imageOffset":26933262,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10000046,"imageIndex":1},{"imageOffset":26935335,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10002119,"imageIndex":1},{"imageOffset":26934557,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10001341,"imageIndex":1},{"imageOffset":27054664,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10121448,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748058,"name":"Chrome_IOThread","frames":[{"imageOffset":43210,"symbol":"kevent64","symbolLocation":10,"imageIndex":8},{"imageOffset":27151428,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10218212,"imageIndex":1},{"imageOffset":26851615,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9918399,"imageIndex":1},{"imageOffset":26664828,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9731612,"imageIndex":1},{"imageOffset":26968888,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10035672,"imageIndex":1},{"imageOffset":19872943,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":2939727,"imageIndex":1},{"imageOffset":26969399,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10036183,"imageIndex":1},{"imageOffset":27054664,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10121448,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748059,"name":"MemoryInfra","frames":[{"imageOffset":6522,"symbol":"mach_msg_trap","symbolLocation":10,"imageIndex":8},{"imageOffset":7400,"symbol":"mach_msg","symbolLocation":56,"imageIndex":8},{"imageOffset":27091495,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10158279,"imageIndex":1},{"imageOffset":27091118,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10157902,"imageIndex":1},{"imageOffset":26549607,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9616391,"imageIndex":1},{"imageOffset":26851615,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9918399,"imageIndex":1},{"imageOffset":26664828,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9731612,"imageIndex":1},{"imageOffset":26968888,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10035672,"imageIndex":1},{"imageOffset":26969399,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10036183,"imageIndex":1},{"imageOffset":27054664,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10121448,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748060,"frames":[{"imageOffset":25422,"symbol":"kevent","symbolLocation":10,"imageIndex":8},{"imageOffset":102174,"symbol":"uv_free_interface_addresses","symbolLocation":1310,"imageIndex":1},{"imageOffset":32703,"symbol":"uv_run","symbolLocation":319,"imageIndex":1},{"imageOffset":55574127,"symbol":"node::MultiIsolatePlatform::CancelPendingDelayedTasks(v8::Isolate*)","symbolLocation":687,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748061,"frames":[{"imageOffset":17386,"symbol":"__psynch_cvwait","symbolLocation":10,"imageIndex":8},{"imageOffset":27247,"symbol":"_pthread_cond_wait","symbolLocation":1249,"imageIndex":7},{"imageOffset":81865,"symbol":"uv_cond_wait","symbolLocation":9,"imageIndex":1},{"imageOffset":55574594,"symbol":"node::MultiIsolatePlatform::CancelPendingDelayedTasks(v8::Isolate*)","symbolLocation":1154,"imageIndex":1},{"imageOffset":55564375,"symbol":"node::OnFatalError(char const*, char const*)","symbolLocation":428983,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748062,"frames":[{"imageOffset":17386,"symbol":"__psynch_cvwait","symbolLocation":10,"imageIndex":8},{"imageOffset":27247,"symbol":"_pthread_cond_wait","symbolLocation":1249,"imageIndex":7},{"imageOffset":81865,"symbol":"uv_cond_wait","symbolLocation":9,"imageIndex":1},{"imageOffset":55574594,"symbol":"node::MultiIsolatePlatform::CancelPendingDelayedTasks(v8::Isolate*)","symbolLocation":1154,"imageIndex":1},{"imageOffset":55564375,"symbol":"node::OnFatalError(char const*, char const*)","symbolLocation":428983,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748063,"frames":[{"imageOffset":17386,"symbol":"__psynch_cvwait","symbolLocation":10,"imageIndex":8},{"imageOffset":27247,"symbol":"_pthread_cond_wait","symbolLocation":1249,"imageIndex":7},{"imageOffset":81865,"symbol":"uv_cond_wait","symbolLocation":9,"imageIndex":1},{"imageOffset":55574594,"symbol":"node::MultiIsolatePlatform::CancelPendingDelayedTasks(v8::Isolate*)","symbolLocation":1154,"imageIndex":1},{"imageOffset":55564375,"symbol":"node::OnFatalError(char const*, char const*)","symbolLocation":428983,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748064,"frames":[{"imageOffset":6582,"symbol":"semaphore_wait_trap","symbolLocation":10,"imageIndex":8},{"imageOffset":83312,"symbol":"uv_sem_wait","symbolLocation":16,"imageIndex":1},{"imageOffset":55995283,"symbol":"node::SetTracingController(v8::TracingController*)","symbolLocation":65043,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748066,"frames":[{"imageOffset":17386,"symbol":"__psynch_cvwait","symbolLocation":10,"imageIndex":8},{"imageOffset":27247,"symbol":"_pthread_cond_wait","symbolLocation":1249,"imageIndex":7},{"imageOffset":81865,"symbol":"uv_cond_wait","symbolLocation":9,"imageIndex":1},{"imageOffset":16969,"symbol":"uv_cancel","symbolLocation":505,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748067,"frames":[{"imageOffset":17386,"symbol":"__psynch_cvwait","symbolLocation":10,"imageIndex":8},{"imageOffset":27247,"symbol":"_pthread_cond_wait","symbolLocation":1249,"imageIndex":7},{"imageOffset":81865,"symbol":"uv_cond_wait","symbolLocation":9,"imageIndex":1},{"imageOffset":16969,"symbol":"uv_cancel","symbolLocation":505,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748068,"frames":[{"imageOffset":17386,"symbol":"__psynch_cvwait","symbolLocation":10,"imageIndex":8},{"imageOffset":27247,"symbol":"_pthread_cond_wait","symbolLocation":1249,"imageIndex":7},{"imageOffset":81865,"symbol":"uv_cond_wait","symbolLocation":9,"imageIndex":1},{"imageOffset":16969,"symbol":"uv_cancel","symbolLocation":505,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748069,"frames":[{"imageOffset":17386,"symbol":"__psynch_cvwait","symbolLocation":10,"imageIndex":8},{"imageOffset":27247,"symbol":"_pthread_cond_wait","symbolLocation":1249,"imageIndex":7},{"imageOffset":81865,"symbol":"uv_cond_wait","symbolLocation":9,"imageIndex":1},{"imageOffset":16969,"symbol":"uv_cancel","symbolLocation":505,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748081,"name":"NetworkConfigWatcher","frames":[{"imageOffset":6522,"symbol":"mach_msg_trap","symbolLocation":10,"imageIndex":8},{"imageOffset":7400,"symbol":"mach_msg","symbolLocation":56,"imageIndex":8},{"imageOffset":523485,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":319,"imageIndex":0},{"imageOffset":516968,"symbol":"__CFRunLoopRun","symbolLocation":1276,"imageIndex":0},{"imageOffset":513964,"symbol":"CFRunLoopRunSpecific","symbolLocation":562,"imageIndex":0},{"imageOffset":392602,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":216,"imageIndex":9},{"imageOffset":27077449,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10144233,"imageIndex":1},{"imageOffset":27072587,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10139371,"imageIndex":1},{"imageOffset":26851615,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9918399,"imageIndex":1},{"imageOffset":26664828,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9731612,"imageIndex":1},{"imageOffset":26968888,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10035672,"imageIndex":1},{"imageOffset":26969399,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10036183,"imageIndex":1},{"imageOffset":27054664,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10121448,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748082,"name":"CrShutdownDetector","frames":[{"imageOffset":9146,"symbol":"read","symbolLocation":10,"imageIndex":8},{"imageOffset":1805830,"symbol":"ElectronInitializeICUandStartNode","symbolLocation":1701094,"imageIndex":1},{"imageOffset":27054664,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10121448,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748083,"name":"NetworkConfigWatcher","frames":[{"imageOffset":6522,"symbol":"mach_msg_trap","symbolLocation":10,"imageIndex":8},{"imageOffset":7400,"symbol":"mach_msg","symbolLocation":56,"imageIndex":8},{"imageOffset":523485,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":319,"imageIndex":0},{"imageOffset":516968,"symbol":"__CFRunLoopRun","symbolLocation":1276,"imageIndex":0},{"imageOffset":513964,"symbol":"CFRunLoopRunSpecific","symbolLocation":562,"imageIndex":0},{"imageOffset":392602,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":216,"imageIndex":9},{"imageOffset":27077449,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10144233,"imageIndex":1},{"imageOffset":27072587,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10139371,"imageIndex":1},{"imageOffset":26851615,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9918399,"imageIndex":1},{"imageOffset":26664828,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":9731612,"imageIndex":1},{"imageOffset":26968888,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10035672,"imageIndex":1},{"imageOffset":26969399,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10036183,"imageIndex":1},{"imageOffset":27054664,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10121448,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748084,"name":"ThreadPoolForegroundWorker","frames":[{"imageOffset":6522,"symbol":"mach_msg_trap","symbolLocation":10,"imageIndex":8},{"imageOffset":7400,"symbol":"mach_msg","symbolLocation":56,"imageIndex":8},{"imageOffset":27091495,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10158279,"imageIndex":1},{"imageOffset":26933262,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10000046,"imageIndex":1},{"imageOffset":26935335,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10002119,"imageIndex":1},{"imageOffset":26934557,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10001341,"imageIndex":1},{"imageOffset":27054664,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10121448,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748085,"name":"CompositorTileWorker1","frames":[{"imageOffset":17386,"symbol":"__psynch_cvwait","symbolLocation":10,"imageIndex":8},{"imageOffset":27247,"symbol":"_pthread_cond_wait","symbolLocation":1249,"imageIndex":7},{"imageOffset":27052080,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10118864,"imageIndex":1},{"imageOffset":37054485,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":20121269,"imageIndex":1},{"imageOffset":27054664,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10121448,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748086,"name":"ThreadPoolForegroundWorker","frames":[{"imageOffset":6522,"symbol":"mach_msg_trap","symbolLocation":10,"imageIndex":8},{"imageOffset":7400,"symbol":"mach_msg","symbolLocation":56,"imageIndex":8},{"imageOffset":27091495,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10158279,"imageIndex":1},{"imageOffset":26933262,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10000046,"imageIndex":1},{"imageOffset":26934849,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10001633,"imageIndex":1},{"imageOffset":26934557,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10001341,"imageIndex":1},{"imageOffset":27054664,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10121448,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748087,"name":"ThreadPoolSingleThreadForegroundBlocking0","frames":[{"imageOffset":6522,"symbol":"mach_msg_trap","symbolLocation":10,"imageIndex":8},{"imageOffset":7400,"symbol":"mach_msg","symbolLocation":56,"imageIndex":8},{"imageOffset":27091495,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10158279,"imageIndex":1},{"imageOffset":27091118,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10157902,"imageIndex":1},{"imageOffset":26933277,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10000061,"imageIndex":1},{"imageOffset":26935335,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10002119,"imageIndex":1},{"imageOffset":26934653,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10001437,"imageIndex":1},{"imageOffset":27054664,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10121448,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748089,"frames":[{"imageOffset":6582,"symbol":"semaphore_wait_trap","symbolLocation":10,"imageIndex":8},{"imageOffset":83312,"symbol":"uv_sem_wait","symbolLocation":16,"imageIndex":1},{"imageOffset":1440825,"symbol":"ElectronInitializeICUandStartNode","symbolLocation":1336089,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748090,"frames":[{"imageOffset":8008,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":7}]},{"id":1748094,"frames":[{"imageOffset":8008,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":7}]},{"id":1748109,"frames":[{"imageOffset":8008,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":7}]},{"id":1748110,"frames":[{"imageOffset":8008,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":7}]},{"id":1748143,"name":"com.apple.NSEventThread","frames":[{"imageOffset":6522,"symbol":"mach_msg_trap","symbolLocation":10,"imageIndex":8},{"imageOffset":7400,"symbol":"mach_msg","symbolLocation":56,"imageIndex":8},{"imageOffset":523485,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":319,"imageIndex":0},{"imageOffset":516968,"symbol":"__CFRunLoopRun","symbolLocation":1276,"imageIndex":0},{"imageOffset":513964,"symbol":"CFRunLoopRunSpecific","symbolLocation":562,"imageIndex":0},{"imageOffset":1752926,"symbol":"_NSEventThread","symbolLocation":132,"imageIndex":4},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]},{"id":1748150,"name":"ThreadPoolSingleThreadSharedBackgroundBlocking1","frames":[{"imageOffset":6522,"symbol":"mach_msg_trap","symbolLocation":10,"imageIndex":8},{"imageOffset":7400,"symbol":"mach_msg","symbolLocation":56,"imageIndex":8},{"imageOffset":27091495,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10158279,"imageIndex":1},{"imageOffset":27091118,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10157902,"imageIndex":1},{"imageOffset":26933277,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10000061,"imageIndex":1},{"imageOffset":26934849,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10001633,"imageIndex":1},{"imageOffset":26934509,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10001293,"imageIndex":1},{"imageOffset":27054664,"symbol":"v8::internal::SetupIsolateDelegate::SetupHeap(v8::internal::Heap*)","symbolLocation":10121448,"imageIndex":1},{"imageOffset":25825,"symbol":"_pthread_start","symbolLocation":125,"imageIndex":7},{"imageOffset":8043,"symbol":"thread_start","symbolLocation":15,"imageIndex":7}]}],
  "usedImages" : [
  {
    "source" : "P",
    "arch" : "x86_64h",
    "base" : 140703473623040,
    "CFBundleShortVersionString" : "6.9",
    "CFBundleIdentifier" : "com.apple.CoreFoundation",
    "size" : 5251072,
    "uuid" : "743f0cb7-e962-3e42-8653-7bd141129561",
    "path" : "\/System\/Library\/Frameworks\/CoreFoundation.framework\/Versions\/A\/CoreFoundation",
    "name" : "CoreFoundation",
    "CFBundleVersion" : "1858.112"
  },
  {
    "source" : "P",
    "arch" : "x86_64",
    "base" : 4659404800,
    "CFBundleIdentifier" : "com.github.Electron.framework",
    "size" : 128385024,
    "uuid" : "20f34f0e-dbe6-32f9-8c74-bdacf1f91bdc",
    "path" : "\/Applications\/Unity Hub.app\/Contents\/Frameworks\/Electron Framework.framework\/Versions\/A\/Electron Framework",
    "name" : "Electron Framework",
    "CFBundleVersion" : "13.6.3"
  },
  {
    "size" : 0,
    "source" : "A",
    "base" : 0,
    "uuid" : "00000000-0000-0000-0000-000000000000"
  },
  {
    "source" : "P",
    "arch" : "x86_64",
    "base" : 140703621296128,
    "CFBundleShortVersionString" : "2.1.1",
    "CFBundleIdentifier" : "com.apple.HIToolbox",
    "size" : 3096576,
    "uuid" : "7761967d-a138-33b6-9e3f-5c5420a2eeff",
    "path" : "\/System\/Library\/Frameworks\/Carbon.framework\/Versions\/A\/Frameworks\/HIToolbox.framework\/Versions\/A\/HIToolbox",
    "name" : "HIToolbox"
  },
  {
    "source" : "P",
    "arch" : "x86_64",
    "base" : 140703518081024,
    "CFBundleShortVersionString" : "6.9",
    "CFBundleIdentifier" : "com.apple.AppKit",
    "size" : 15261696,
    "uuid" : "92a78ebd-bba5-3f18-a5e1-768c955539d7",
    "path" : "\/System\/Library\/Frameworks\/AppKit.framework\/Versions\/C\/AppKit",
    "name" : "AppKit",
    "CFBundleVersion" : "2113.40.127"
  },
  {
    "source" : "P",
    "arch" : "x86_64",
    "base" : 4510437376,
    "CFBundleShortVersionString" : "3.1.2",
    "CFBundleIdentifier" : "com.unity3d.unityhub",
    "size" : 327680,
    "uuid" : "ab3cb5d1-eb3f-388f-8c63-416a00da1aaa",
    "path" : "\/Applications\/Unity Hub.app\/Contents\/MacOS\/Unity Hub",
    "name" : "Unity Hub",
    "CFBundleVersion" : "3.1.2"
  },
  {
    "source" : "P",
    "arch" : "x86_64",
    "base" : 4658651136,
    "size" : 442368,
    "uuid" : "dd9e80de-fb3b-349b-96a4-46874ad34d11",
    "path" : "\/usr\/lib\/dyld",
    "name" : "dyld"
  },
  {
    "source" : "P",
    "arch" : "x86_64",
    "base" : 140703473307648,
    "size" : 49152,
    "uuid" : "2f6c275d-7e14-3d31-a924-e1bb41d2415f",
    "path" : "\/usr\/lib\/system\/libsystem_pthread.dylib",
    "name" : "libsystem_pthread.dylib"
  },
  {
    "source" : "P",
    "arch" : "x86_64",
    "base" : 140703473078272,
    "size" : 229376,
    "uuid" : "26a59789-b846-3ed4-96dc-8dbef3c0c8e7",
    "path" : "\/usr\/lib\/system\/libsystem_kernel.dylib",
    "name" : "libsystem_kernel.dylib"
  },
  {
    "source" : "P",
    "arch" : "x86_64",
    "base" : 140703488770048,
    "CFBundleShortVersionString" : "6.9",
    "CFBundleIdentifier" : "com.apple.Foundation",
    "size" : 3915776,
    "uuid" : "3370467f-ef48-301d-97d1-cdc236b7053a",
    "path" : "\/System\/Library\/Frameworks\/Foundation.framework\/Versions\/C\/Foundation",
    "name" : "Foundation",
    "CFBundleVersion" : "1858.112"
  }
],
  "sharedCache" : {
  "base" : 140703470034944,
  "size" : 15224815616,
  "uuid" : "6cc5ecdc-5119-37f0-9a85-4f48a50f5f78"
},
  "vmSummary" : "ReadOnly portion of Libraries: Total=1.2G resident=0K(0%) swapped_out_or_unallocated=1.2G(100%)\nWritable regions: Total=1.7G written=0K(0%) resident=0K(0%) swapped_out=0K(0%) unallocated=1.7G(100%)\n\n                                VIRTUAL   REGION \nREGION TYPE                        SIZE    COUNT (non-coalesced) \n===========                     =======  ======= \nAccelerate framework               128K        1 \nActivity Tracing                   256K        1 \nCG backing stores                  480K        4 \nColorSync                           80K        5 \nCoreGraphics                         4K        1 \nCoreServices                      6656K       36 \nKernel Alloc Once                   12K        2 \nMALLOC                           293.3M       49 \nMALLOC guard page                   48K       11 \nMALLOC_MEDIUM (reserved)         840.0M        7         reserved VM address space (unallocated)\nMALLOC_NANO (reserved)           384.0M        1         reserved VM address space (unallocated)\nMach message                        16K        2 \nMemory Tag 253                    32.0G      200 \nMemory Tag 255                     4.0G       34 \nSTACK GUARD                       56.1M       33 \nStack                            188.3M       33 \nVM_ALLOCATE                        184K       15 \n__DATA                            39.6M      514 \n__DATA_CONST                      30.5M      330 \n__DATA_DIRTY                      1636K      213 \n__FONT_DATA                          4K        1 \n__LINKEDIT                       655.4M       17 \n__OBJC_RO                         82.6M        1 \n__OBJC_RW                         3200K        2 \n__TEXT                           622.6M      532 \n__UNICODE                          592K        1 \ndyld private memory               1024K        1 \nmapped file                      162.2M       22 \nshared memory                      772K       16 \n===========                     =======  ======= \nTOTAL                             39.3G     2085 \nTOTAL, minus reserved VM space    38.1G     2085 \n",
  "legacyInfo" : {
  "threadTriggered" : {
    "name" : "CrBrowserMain",
    "queue" : "com.apple.main-thread"
  }
},
  "trialInfo" : {
  "rollouts" : [

  ],
  "experiments" : [

  ]
}
}

Model: Macmini8,1, BootROM 1731.100.130.0.0 (iBridge: 19.16.14243.0.0,0), 6 processors, 6-Core Intel Core i7, 3.2 GHz, 32 GB, SMC 
Graphics: Intel UHD Graphics 630, Intel UHD Graphics 630, Built-In
Memory Module: BANK 0/ChannelA-DIMM0, 16 GB, DDR4, 2667 MHz, Micron, 16ATF2G64HZ-2G6E3
Memory Module: BANK 2/ChannelB-DIMM0, 16 GB, DDR4, 2667 MHz, Micron, 16ATF2G64HZ-2G6E3
Bluetooth: Version (null), 0 services, 0 devices, 0 incoming serial ports
Network Service: Ethernet, Ethernet, en0
Network Service: Thunderbolt Ethernet Slot 1, Ethernet, en5
PCI Card: pci8086,15f0, USB eXtensible Host Controller, Thunderbolt@191,0,0
PCI Card: pci8086,15f0, USB eXtensible Host Controller, Thunderbolt@61,0,0
PCI Card: pci1d0f,61, NVM Express Controller, Thunderbolt@80,0,0
PCI Card: pci1d0f,8250, Serial Controller, Thunderbolt@81,0,0
PCI Card: ethernet, Ethernet Controller, Thunderbolt@202,0,0
USB Device: USB31Bus
USB Device: USB31Bus
USB Device: USB31Bus
USB Device: T2Bus
USB Device: Headset
USB Device: Apple T2 Controller
Thunderbolt Bus: Mac mini, Apple Inc., 41.2
Thunderbolt Device: Nitro Thunderbolt Adapter T-02, Amazon Web Services, 3, 62.6
Thunderbolt Bus: Mac mini, Apple Inc., 41.2
Thunderbolt Device: Nitro Thunderbolt Adapter T-01, Amazon Web Services, 3, 62.6

